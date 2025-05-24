import { Docente } from "../entities/Teacher";
import { User } from "../entities/user";
import { AppDataSource } from "../config/database";
import { Grupo } from "../entities/Grupo";
import { CreateDocenteDto } from "../dtos/Docentedto/CreateDocente";
import { UpdateDocenteDto } from "../dtos/Docentedto/UpdateDocente";  
import { In } from "typeorm";
import { NotificationService } from "./NotificationService";
import * as bcrypt from 'bcrypt';
import { CreateActivityDto } from "../dtos/activitydto/CreateActivity";

export class TeacherService {
  private docenteRepository = AppDataSource.getRepository(Docente);
  private grupoRepository = AppDataSource.getRepository(Grupo);
  private userRepository = AppDataSource.getRepository(User);
   private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async create(data: CreateDocenteDto) {
    // Validar email único
    if (await this.userRepository.findOne({ where: { email: data.email } })) {
      throw new Error('El email ya está registrado');
    }

    // Validar grupos existentes
    if (data.grupoIds && data.grupoIds.length > 0) {
      const gruposExistentes = await this.grupoRepository.count({
        where: { id: In(data.grupoIds) }
      });
      if (gruposExistentes !== data.grupoIds.length) {
        throw new Error("Uno o más grupos no existen");
      }
    }

    // Crear usuario asociado
    const user = this.userRepository.create({
      email: data.email,
      password: await bcrypt.hash(data.password, 10)
    });

    // Crear docente
    const docente = this.docenteRepository.create({
      NombreCompleto: data.NombreCompleto,
      grupos: data.grupoIds 
        ? await this.grupoRepository.findBy({ id: In(data.grupoIds) }) 
        : [],
      user
    });

    // Guardar en transacción
    await AppDataSource.transaction(async manager => {
      await manager.save(user);
      await manager.save(docente);
    });

    return docente;
  }

  async update(id: number, data: UpdateDocenteDto) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      relations: ["grupos", "user"]
    });

    if (!docente) throw new Error("Docente no encontrado");

    // Actualizar datos básicos
    if (data.NombreCompleto) docente.NombreCompleto = data.NombreCompleto;

    // Actualizar grupos
    if (data.grupoIds) {
      const grupos = await this.grupoRepository.findBy({ id: In(data.grupoIds) });
      docente.grupos = grupos;
    }

    // Actualizar credenciales si se proporcionan
    if (data.email && docente.user) {
      docente.user.email = data.email;
    }
    if (data.password && docente.user) {
      docente.user.password = await bcrypt.hash(data.password, 10);
    }

    return await this.docenteRepository.save(docente);
  }

  async delete(id: number) {
    const docente = await this.docenteRepository.findOne({
      where: { id },
      relations: ["user"]
    });

    if (!docente) throw new Error("Docente no encontrado");

    await AppDataSource.transaction(async manager => {
      if (docente.user) {
        await manager.remove(User, docente.user);
      }
      await manager.remove(Docente, docente);
    });
  }

  async findById(id: number) {
    return await this.docenteRepository.findOne({
      where: { id },
      relations: ["user", "grupos", "clases", "activities", "posts"],
    });
  }

  async findAll() {
    return await this.docenteRepository.find({
      relations: ["user", "grupos", "clases", "activities", "posts"],
    });
  }

   async createActivity(data: CreateActivityDto) {
    const actividad = await this.activityRepository.create(data);
    
    // Notificación solo si es para un grupo específico
    if (data.grupoId) {
      await this.notificationService.createGroupNotification(data.grupoId, {
        message: `Nueva actividad: ${actividad.title}`,
        type: "activity",
        referenceId: actividad.id
      });
    }
    
    return actividad;
  }
}