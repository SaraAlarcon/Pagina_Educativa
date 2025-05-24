import { Request, Response } from 'express';
import { UserService } from '../services/userservices';
import { CreateUserDto } from "../dtos/userdto/CreateUser";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repository/userRepository';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login(req: Request, res: Response)  {
        try {
            const { email, password } = req.body;
            
            // 1. Buscar usuario con contraseña
            const user = await userRepository.findByEmail(email, true);
            
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

    async getProfile(req: Request, res: Response) {
        try {
            // Asume que el middleware de autenticación añadió el usuario a req.user
            if (!req.user) {
                return res.status(401).json({ message: 'No autenticado' });
            }
    
            const user = await this.userService.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Excluir campos sensibles
            const { password, ...profile } = user;
            return res.status(200).json(profile);
    
        } catch (error: any) {
            return res.status(500).json({ 
                message: 'Error al obtener perfil',
                error: error.message 
            });
        }
    }

    async validateToken(req: Request, res: Response) {
        try {
            // El middleware de autenticación ya validó el token
            if (!req.user) {
                return res.status(401).json({ message: 'No autenticado' });
            }
            
            return res.status(200).json({ 
                isValid: true,
                user: {
                    id: req.user.id,
                    email: req.user.email
                }
            });
        } catch (error: any) {
            return res.status(500).json({ 
                message: 'Error al validar token',
                error: error.message
            });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            // En JWT stateless, el logout se maneja en el cliente
            return res.status(200).json({ message: 'Sesión cerrada correctamente' });
        } catch (error: any) {
            return res.status(500).json({ 
                message: 'Error al cerrar sesión',
                error: error.message
            });
        }
       
    }
}
export const userController = new UserController(); 