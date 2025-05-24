// src/services/NotificationService.ts
import { notificationRepository } from "../repository/NotificationRepository";
import { CreateNotificationDto,  } from "../dtos/Notificationdto/CreateNotification";
import {MarkAsSeenDto} from "../dtos/Notificationdto/MarkAsSeen"



export class NotificationService {
 
  async createPersonalNotification(data: CreateNotificationDto) {
    return await notificationRepository.create(data);
  }

  async createGroupNotification(grupoId: number, data: Omit<CreateNotificationDto, 'userId'>) {
    return await notificationRepository.createForGrupo(grupoId, data);
  }

  async getUserNotifications(userId: number) {
    return await notificationRepository.getUserNotifications(userId);
  }

  async markAsSeen(data: MarkAsSeenDto) {
    return await notificationRepository.markAsSeen(data.notificationIds);
  }
}
export const notificationService = new NotificationService();