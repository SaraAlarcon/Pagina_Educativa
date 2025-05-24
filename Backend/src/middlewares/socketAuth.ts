// src/middlewares/socketAuth.ts
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';

export const socketAuthMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    // 1. Obtener token del handshake (puede venir en auth o headers)
    const token = socket.handshake.auth.token || 
                 (socket.handshake.headers.authorization?.split(' ')[1]);

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    // 2. Verificar token (misma lógica que authenticateJWT)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: number };
    
    // 3. Obtener usuario de la base de datos
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.userId },
      relations: ['docente', 'alumno'],
      select: ['id', 'email']
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 4. Adjuntar usuario al socket para uso posterior
    socket.data.user = {
      id: user.id,
      email: user.email,
      ...(user.docente && { docente: { id: user.docente.id } }),
      ...(user.alumno && { alumno: { id: user.alumno.id } })
    };

    next();
  } catch (error) {
    next(new Error('No autorizado: ' + error,));
  }
};