// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { userRepository } from '../repository/userRepository';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // 1. Buscar usuario con contraseña
      const user = await this.userRepository.findOne({ 
        where: { email },
        relations: ['docente', 'alumno'],
        select: ['id', 'email', 'password']
      });
      
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      
      // 2. Validar contraseña
      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // 3. Generar token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '8h' }
      );

      // 4. Excluir password en la respuesta
      const { password: _, ...userData } = user;
      return res.json({ token, user: userData });
      
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  async getProfile(req: Request, res: Response) :Promise<void>{
    try {
      if (!req.user) {
         res.status(401).json({ message: 'No autenticado' });
      }

      const user = await this.userRepository.findOne({
        where: { id: req.user!.id },
        relations: ['docente', 'alumno'],
        select: ['id', 'email']
      });

      if (!user) {
         res.status(404).json({ message: 'Usuario no encontrado' });
      }

       res.status(200).json(user);
    } catch (error: any) {
       res.status(500).json({ 
        message: 'Error al obtener perfil',
        error: error.message 
      });
    }
  }

  async validateToken(req: Request, res: Response):Promise<void> {
    try {
      if (!req.user) {
         res.status(401).json({ message: 'No autenticado' });
      }
      
       res.status(200).json({ 
        isValid: true,
        user: {
          id: req.user!.id,
          email: req.user!.email
        }
      });
    } catch (error: any) {
       res.status(500).json({ 
        message: 'Error al validar token',
        error: error.message
      });
    }
  }

  async logout(req: Request, res: Response):Promise<void> {
    try {
       res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error: any) {
       res.status(500).json({ 
        message: 'Error al cerrar sesión',
        error: error.message
      });
    }
  }
}