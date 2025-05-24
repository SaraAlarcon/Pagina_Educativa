import { Alumno } from "../entities/Alumno";
import { User } from "../entities/user";
import { AppDataSource } from "../config/database";
import { Grupo } from "../entities/Grupo";
import { CreateAlumnoDto } from "../dtos/Alumnodto/CreateAlumno";
import {UpdateAlumnoDto} from "../dtos/Alumnodto/UpdateAlumno";
import { SubmitActivityDto } from "../dtos/Alumnodto/SubmitActivityDto";
import { Activity } from "../entities/activity";
import { ActivitySubmission } from "../entities/ActivitySubmission";
import { NotificationService, notificationService } from "./NotificationService"; // Importa la instancia
import * as bcrypt from 'bcrypt';
import { In } from 'typeorm';
import { promises } from "dns";

export class AlumnoService {
  private alumnoRepository = AppDataSource.getRepository(Alumno);
  private userRepository = AppDataSource.getRepository(User);
  private grupoRepository = AppDataSource.getRepository(Grupo);
   private activityRepository = AppDataSource.getRepository(Activity);
  private activitySubmissionRepository = AppDataSource.getRepository(ActivitySubmission);
  private notificationService = new NotificationService(); // Agregar esta línea

  /**
   * Crea un nuevo alumno con su usuario asociado y lo asigna a un grupo.
   */
  async create(data: CreateAlumnoDto) {
    // 1. Validar que el email no esté registrado
    const existingUser = await this.userRepository.findOne({ 
      where: { email: data.email } 
    });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // 2. Validar que el grupo exista
    const grupo = await this.grupoRepository.findOneBy({ id: data.grupoId });
    if (!grupo) {
      throw new Error("Grupo no encontrado");
    }

    // 3. Crear el usuario (con contraseña hasheada)
    const user = this.userRepository.create({
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    });

    // 4. Crear el alumno
    const alumno = this.alumnoRepository.create({
      NombreCompleto: data.NombreCompleto,
      grupo,
      user, // Relación 1:1 con User
    });

    // 5. Guardar en transacción (atomicidad)
    await AppDataSource.transaction(async (manager) => {
      await manager.save(user);
      await manager.save(alumno);
    });

    return alumno;
  }

  /**
   * Actualiza un alumno existente (nombre, grupo o credenciales de usuario).
   */
  async update(id: number, data: UpdateAlumnoDto) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id },
      relations: ["user", "grupo"], // Cargar relaciones
    });

    if (!alumno) {
      throw new Error("Alumno no encontrado");
    }

    // Actualizar nombre si se proporciona
    if (data.NombreCompleto) {
      alumno.NombreCompleto = data.NombreCompleto;
    }

    // Actualizar grupo si se proporciona
    if (data.grupoId) {
      const grupo = await this.grupoRepository.findOneBy({ id: data.grupoId });
      if (!grupo) {
        throw new Error("Grupo no encontrado");
      }
      alumno.grupo = grupo;
    }

    // Actualizar email si se proporciona
    if (data.email && alumno.user) {
      const emailExists = await this.userRepository.findOne({ 
        where: { email: data.email } 
      });
      if (emailExists && emailExists.id !== alumno.user.id) {
        throw new Error("El email ya está en uso por otro usuario");
      }
      alumno.user.email = data.email;
    }

    // Actualizar contraseña si se proporciona
    if (data.password && alumno.user) {
      alumno.user.password = await bcrypt.hash(data.password, 10);
    }

    return await this.alumnoRepository.save(alumno);
  }

  /**
   * Elimina un alumno y su usuario asociado.
   */
  async delete(id: number) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id },
      relations: ["user"], // Necesario para eliminar el User
    });

    if (!alumno) {
      throw new Error("Alumno no encontrado");
    }

    await AppDataSource.transaction(async (manager) => {
      if (alumno.user) {
        await manager.remove(User, alumno.user); // Eliminar usuario primero
      }
      await manager.remove(Alumno, alumno); // Luego el alumno
    });
  }

  /**
   * Obtiene un alumno por su ID (con relaciones cargadas).
   */
  async findById(id: number) {
    return await this.alumnoRepository.findOne({
      where: { id },
      relations: ["user", "grupo"], // Carga User y Grupo
    });
  }

  /**
   * Obtiene todos los alumnos (con relaciones básicas).
   */
  async findAll() {
    return await this.alumnoRepository.find({
      relations: ["user", "grupo"], // Carga User y Grupo
    });
  }

  /**
   * Obtiene alumnos por grupo.
   */
  async findByGrupo(grupoId: number) {
    return await this.alumnoRepository.find({
      where: { grupo: { id: grupoId } },
      relations: ["user"], // Carga solo User (el grupo ya está filtrado)
    });
  }

  /**
   * Cambia el grupo de un alumno (alternativa a usar update).
   */
  async changeGrupo(alumnoId: number, grupoId: number) {
    const alumno = await this.alumnoRepository.findOneBy({ id: alumnoId });
    if (!alumno) {
      throw new Error("Alumno no encontrado");
    }

    const grupo = await this.grupoRepository.findOneBy({ id: grupoId });
    if (!grupo) {
      throw new Error("Grupo no encontrado");
    }

    alumno.grupo = grupo;
    return await this.alumnoRepository.save(alumno);
  }

    async submitActivity(data: SubmitActivityDto) {
    // Verificar que el alumno y la actividad existan
    const [alumno, actividad] = await Promise.all([
      this.alumnoRepository.findOne({
        where: { id: data.alumnoId },
        relations: ["grupo.docente"]
      }),
      this.activityRepository.findOneBy({ id: data.actividadId })
    ]);

    if (!alumno) throw new Error("Alumno no encontrado");
    if (!actividad) throw new Error("Actividad no encontrada");

    // Crear la entrega
    const entrega = this.activitySubmissionRepository.create({
      alumno: { id: data.alumnoId },
      activity: { id: data.actividadId },
      fileUrl: data.fileUrl,
      comentario: data.comentario
    });

    const savedSubmission = await this.activitySubmissionRepository.save(entrega);
    
    // Notificar al docente del grupo del alumno
    if (alumno.grupo?.docente?.id) {
      await notificationService.createPersonalNotification({
        message: `Entrega de actividad por ${alumno.NombreCompleto}`,
        type: "activity",
        referenceId: savedSubmission.id,
        userId: alumno.grupo.docente.id
      });
    }
    
    return savedSubmission;
  }
}