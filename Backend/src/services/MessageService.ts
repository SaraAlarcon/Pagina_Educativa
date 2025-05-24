// src/services/MessageService.ts
import { AppDataSource } from "../config/database";
import { messageRepository } from "../repository/MessageRepository";
import { CreateMessageDto } from "../dtos/message.ts/CreateMessage";
import { GetMessagesDto } from "../dtos/message.ts/GetMessages";
import { User } from "../entities/user";
import { Alumno } from "../entities/Alumno";
import { NotificationService } from "./NotificationService";

export class MessageService {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }
  async sendMessage(data: CreateMessageDto) {
    // Validar que puedan comunicarse
    const canCommunicate = await this.validateSameGroup(data.senderId, data.receiverId);
    if (!canCommunicate) {
      throw new Error("Los usuarios no pueden comunicarse");
    }

    const mensaje = await messageRepository.create(data);
    
    // Notificación al receptor
    await this.NotificationService.createPersonalNotification({
      message: "Tienes un nuevo mensaje",
      type: "message",
      referenceId: mensaje.id,
      userId: data.receiverId
    });
    
    return mensaje;
  }

  async getConversation(data: GetMessagesDto) {
    return await messageRepository.getConversation(data.userId1, data.userId2);
  }

  async getUserMessages(userId: number) {
    return await messageRepository.getUserMessages(userId);
  }

  async validateSameGroup(senderId: number, receiverId: number): Promise<boolean> {
    const sender = await AppDataSource.getRepository(User).findOne({
      where: { id: senderId },
      relations: ["alumno.grupo"]
    });

    const receiver = await AppDataSource.getRepository(User).findOne({
      where: { id: receiverId },
      relations: ["alumno.grupo", "docente.grupos"]
    });

    if (!sender || !receiver) return false;

    // Si ambos son alumnos, verificar mismo grupo
    if (sender.alumno && receiver.alumno) {
      return sender.alumno.grupo.id === receiver.alumno.grupo.id;
    }

    // Si uno es docente, verificar que el docente tenga el grupo del alumno
    if (sender.alumno && receiver.docente) {
      return receiver.docente.grupos.some(g => g.id === sender.alumno!.grupo.id);
    }

    if (sender.docente && receiver.alumno) {
      return sender.docente.grupos.some(g => g.id === receiver.alumno!.grupo.id);
    }

    // Comunicación entre docentes permitida
    if (sender.docente && receiver.docente) {
      return true;
    }

    return false;
  }
}