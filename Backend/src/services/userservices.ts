import { User } from "../entities/user";
import { AppDataSource } from "../config/database";
import { Docente } from "../entities/Teacher";
import { Alumno } from "../entities/Alumno";
import { Not } from "typeorm"; 
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Busca usuario por ID con relaciones cargadas
   */
  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ["docente", "alumno", "notifications", "sentMessages", "receivedMessages"]
    });
  }

  /**
   * Busca usuario por email
   */
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ 
      where: { email },
      relations: ["docente", "alumno"]
    });
  }

  /**
   * Actualiza credenciales del usuario
   */
  async updateCredentials(id: number, data: { email?: string; password?: string }) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error("Usuario no encontrado");

    if (data.email) {
      const emailExists = await this.userRepository.findOne({ 
        where: { email: data.email } 
      });
      if (emailExists && emailExists.id !== id) {
        throw new Error('El email ya está registrado');
      }
      user.email = data.email;
    }

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.save(user);
  }

  /**
   * Elimina usuario solo si no tiene perfiles asociados
   */
  async deleteIfOrphan(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["docente", "alumno"]
    });

    if (!user) throw new Error("Usuario no encontrado");

    if (user.docente || user.alumno) {
      throw new Error("No se puede eliminar usuario con perfil asociado");
    }

    return await this.userRepository.delete(id);
  }

  /**
   * Obtiene el perfil completo (docente o alumno) asociado al usuario
   */
  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["docente", "alumno"]
    });

    if (!user) throw new Error("Usuario no encontrado");

    return user.docente || user.alumno || null;
  }

  /**
   * Verifica si un email está disponible
   */
  async isEmailAvailable(email: string, excludeUserId?: number) {
    const where: any = { email };
    if (excludeUserId) {
      where.id = Not(excludeUserId);
    }
    const user = await this.userRepository.findOne({ where });
    return !user;
  }
}