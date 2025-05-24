// src/repositories/NotificationRepository.ts
import { AppDataSource } from "../config/database";
import { Notification } from "../entities/notification";
import { User } from "../entities/user";
import { Grupo } from "../entities/Grupo";
import { In } from "typeorm";
import { CreateNotificationDto } from "../dtos/Notificationdto/CreateNotification";

export class NotificationRepository {
  private notificationRepository = AppDataSource.getRepository(Notification);
  private userRepository = AppDataSource.getRepository(User);
  private grupoRepository = AppDataSource.getRepository(Grupo);

  async create(data: CreateNotificationDto) {
    const notificationData: Partial<Notification> = {
      message: data.message,
      type: data.type,
      referenceId: data.referenceId,
      global: data.global || false,
      grupoId: data.grupoId || undefined // Usar undefined en lugar de null
    };

    if (data.userId) {
      const user = await this.userRepository.findOneBy({ id: data.userId });
      if (user) {
        notificationData.user = user;
      }
    }

    const notification = this.notificationRepository.create(notificationData);
    return await this.notificationRepository.save(notification);
  }

  async createForGrupo(grupoId: number, data: Omit<CreateNotificationDto, 'userId'>) {
    const grupo = await this.grupoRepository.findOneBy({ id: grupoId });
    if (!grupo) throw new Error("Grupo no encontrado");

    const alumnos = await this.userRepository.find({
      where: { alumno: { grupo: { id: grupoId } } },
      relations: ["alumno"]
    });

    const notifications = alumnos.map(alumno => {
      return this.notificationRepository.create({
        message: data.message,
        type: data.type,
        referenceId: data.referenceId,
        global: data.global || false,
        grupoId: data.grupoId || undefined,
        user: alumno
      });
    });

    return await this.notificationRepository.save(notifications);
  }

  async getUserNotifications(userId: number) {
    return await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" }
    });
  }

  async markAsSeen(notificationIds: number[]) {
    await this.notificationRepository.update(
      { id: In(notificationIds) },
      { seen: true }
    );
    return true;
  }
}

export const notificationRepository = new NotificationRepository();