// src/repositories/userRepository.ts
import { AppDataSource } from '../config/database';
import { User } from '../entities/user';
import { Repository, Not } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: number, relations: string[] = []): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations,
      select: ['id', 'email', 'docente', 'alumno', 'notifications', 'sentMessages', 'receivedMessages']
    });
  }

  async findByEmail(email: string, includePassword = false): Promise<User | null> {
    const options: any = {
      where: { email },
      relations: ['docente', 'alumno']
    };

    if (includePassword) {
      options.select = [...options.select || [], 'password'];
    }

    return this.repository.findOne(options);
  }

  async isEmailAvailable(email: string, excludeUserId?: number): Promise<boolean> {
    const where: any = { email };
    if (excludeUserId) {
      where.id = Not(excludeUserId);
    }
    const user = await this.repository.findOne({ where });
    return !user;
  }

  async updateCredentials(id: number, data: { email?: string; password?: string }): Promise<User | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    await this.repository.update(id, data);
    return this.findById(id, ['docente', 'alumno']);
  }

  async deleteIfOrphan(id: number): Promise<boolean> {
    const user = await this.findById(id, ['docente', 'alumno']);
    
    if (!user) throw new Error("Usuario no encontrado");
    if (user.docente || user.alumno) return false;

    await this.repository.delete(id);
    return true;
  }

  async validateCredentials(email: string, password: string): Promise<{ isValid: boolean; user?: User }> {
    const user = await this.findByEmail(email, true);
    
    if (!user || !user.password) {
      return { isValid: false };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { isValid: false };

    // No devolver el password en el objeto user
    user.password = undefined!;
    return { isValid: true, user };
  }

  async generateAuthToken(user: User): Promise<string> {
    return jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );
  }
}

export const userRepository = new UserRepository();