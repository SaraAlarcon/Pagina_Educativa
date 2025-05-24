import { Request, Response, NextFunction } from 'express';
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

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Credenciales no proporcionadas' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: number };
    
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.userId },
      relations: ['docente', 'alumno'],
      select: ['id', 'email']
    });

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
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};