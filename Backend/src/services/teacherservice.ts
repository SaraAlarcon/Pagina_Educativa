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
import { ActivityRepository } from "../repository/ActivityRepository";

export class TeacherService {
  private docenteRepository = AppDataSource.getRepository(Docente);
  private grupoRepository = AppDataSource.getRepository(Grupo);
  private userRepository = AppDataSource.getRepository(User);
  private notificationService: NotificationService;
  private activityrepository: ActivityRepository;
  

  constructor() {
    this.notificationService = new NotificationService();
    this.activityrepository = new ActivityRepository();
  }

  async create(data: CreateDocenteDto) {
    // Validar email único
    if (await this.userRepository.findOne({ where: { email: data.email } })) {
      throw new Error('El email ya está registrado');
    }

    // Crear docente primero
    const docente = this.docenteRepository.create({
      NombreCompleto: data.NombreCompleto
    });
    
    // Guardar el docente primero para obtener su ID
    await this.docenteRepository.save(docente);
    
    // Crear usuario asociado con el ID del docente
    const user = this.userRepository.create({
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      docente: docente // Asignar la relación con el docente
    });

    // Guardar el usuario
    await this.userRepository.save(user);

    return docente;
  }

  async update(id: number, data: UpdateDocenteDto) {
    const docente = await this.docenteRepository.findOne({
      where: { id }
    });

    if (!docente) throw new Error("Docente no encontrado");

    // Actualizar datos básicos
    if (data.NombreCompleto) docente.NombreCompleto = data.NombreCompleto;

    return await this.docenteRepository.save(docente);
  }

  async delete(id: number) {
    try {
      // Primero eliminar el usuario asociado
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("docenteId = :id", { id })
        .execute();

      // Luego eliminar el docente
      await this.docenteRepository
        .createQueryBuilder()
        .delete()
        .from(Docente)
        .where("id = :id", { id })
        .execute();

    } catch (err: any) {
      throw new Error(`Error al eliminar docente: ${err?.message || 'Error desconocido'}`);
    }
  }

  async findById(id: number) {
    return await this.docenteRepository.findOne({
      where: { id },
      relations: ["id", "NombreCompleto", "clases", "activities", "posts"],
    });
  }

  async findAll() {
    return await this.docenteRepository.find({
      relations: ["user", "clases", "activities", "posts"],
      select: {
        id: true,
        NombreCompleto: true,
        user: {
          email: true
        },
        clases: true,
        activities: true,
        posts: true
      }
    });
  }

   async createActivity(data: CreateActivityDto) {
    const actividad = await this.activityrepository.create(data);
    
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