// src/middlewares/authmiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        docente?: { id: number };
        alumno?: { id: number };
      };
    }
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: number };
    return await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.userId },
      relations: ['docente', 'alumno'],
      select: ['id', 'email']
    });
  } catch (error) {
    return null;
  }
}
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Credenciales no proporcionadas' });
    return;
  }

  try {
    const user = await getUserFromToken(token);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      ...(user.docente && { docente: { id: user.docente.id } }),
      ...(user.alumno && { alumno: { id: user.alumno.id } })
    };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export const socketAuthMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token no proporcionado');

    const user = await getUserFromToken(token);
    if (!user) throw new Error('Usuario no encontrado');

    socket.data.user = {
      id: user.id,
      email: user.email,
      ...(user.docente && { docente: { id: user.docente.id } }),
      ...(user.alumno && { alumno: { id: user.alumno.id } })
    };
    next();
  } catch (error: unknown) {
    next(new Error('No autorizado: ' + (error instanceof Error ? error.message : 'Error desconocido')));
  }
};