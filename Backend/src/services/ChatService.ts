// src/services/ChatService.ts
import { Server, Socket } from 'socket.io';
import { messageRepository } from '../repository/MessageRepository';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';
import { socketAuthMiddleware } from '../middlewares/authMiddleware';

export class ChatService {
  constructor(private io: Server) {
    // Aplicar middleware de autenticación
    io.use(socketAuthMiddleware);
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      const userId = socket.data.user.id;
      console.log(`New connection from user ${userId}`);

      // Unirse automáticamente a la sala del usuario
      socket.join(`user_${userId}`);

      // Enviar mensaje
      socket.on('sendMessage', async (data: {
        content: string;
        receiverId: number;
      }) => {
        try {
          const canCommunicate = await this.validateSameGroup(userId, data.receiverId);
          if (!canCommunicate) {
            socket.emit('error', 'No pueden comunicarse (no están en el mismo grupo)');
            return;
          }

          const message = await messageRepository.create({
            content: data.content,
            senderId: userId,
            receiverId: data.receiverId
          });
          
          // Notificar a ambos usuarios
          this.io.to(`user_${userId}`).emit('newMessage', message);
          this.io.to(`user_${data.receiverId}`).emit('newMessage', message);
          
        } catch (error) {
          console.error('Error en sendMessage:', error);
          socket.emit('error', 'Error al enviar mensaje');
        }
      });

      socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
      });
    });
  }

  private async validateSameGroup(senderId: number, receiverId: number): Promise<boolean> {
    const userRepo = AppDataSource.getRepository(User);
    
    const sender = await userRepo.findOne({ 
      where: { id: senderId },
      relations: ['alumno.grupo', 'docente.grupos']
    });

    const receiver = await userRepo.findOne({ 
      where: { id: receiverId },
      relations: ['alumno.grupo', 'docente.grupos']
    });

    if (!sender || !receiver) return false;

    // Alumno-Alumno: mismo grupo
    if (sender.alumno && receiver.alumno) {
      return sender.alumno.grupo.id === receiver.alumno.grupo.id;
    }

    // Alumno-Docente: docente tiene el grupo del alumno
    if (sender.alumno && receiver.docente) {
      return receiver.docente.grupos.some(g => g.id === sender.alumno!.grupo.id);
    }

    // Docente-Alumno: docente tiene el grupo del alumno
    if (sender.docente && receiver.alumno) {
      return sender.docente.grupos.some(g => g.id === receiver.alumno!.grupo.id);
    }

    // Docente-Docente: permitir comunicación
    if (sender.docente && receiver.docente) {
      return true;
    }

    return false;
  }
}