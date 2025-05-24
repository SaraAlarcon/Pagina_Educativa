// src/services/ChatService.ts
import { Server, Socket } from 'socket.io';
import { messageRepository } from '../repositories/MessageRepository';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';

export class ChatService {
  constructor(private io: Server) {
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.io.use(this.authenticateSocket.bind(this));
    this.io.on('connection', this.handleConnection.bind(this));
  }

  private async authenticateSocket(socket: Socket, next: any) {
    try {
      const token = socket.handshake.auth.token;
      // Implementa tu lógica de autenticación JWT aquí
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  }

  private async handleConnection(socket: Socket) {
    console.log('New connection:', socket.id);

    socket.on('joinUserRoom', (userId: number) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        // Validar que puedan comunicarse (mismo grupo)
        const canCommunicate = await this.validateSameGroup(data.senderId, data.receiverId);
        if (!canCommunicate) {
          socket.emit('error', 'No pueden comunicarse');
          return;
        }

        const message = await messageRepository.create(data);
        this.io.to(`user_${data.receiverId}`).emit('newMessage', message);
        socket.emit('messageSent', message);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  }

  private async validateSameGroup(senderId: number, receiverId: number): Promise<boolean> {
    // Implementa tu lógica de validación de grupo aquí
    return true;
  }
}