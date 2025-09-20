import { AppDataSource } from '../config/database';
import { User } from '../entities/user';
import bcrypt from 'bcrypt';

export async function seedAdministratorUser() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        
        // Verificar si ya existe un administrador
        const existingAdmin = await userRepository.findOne({
            where: { email: 'admin@educativa.com' }
        });

        if (existingAdmin) {
            return; // Si ya existe, no hacer nada
        }

        // Crear nuevo usuario administrador
        const hashedPassword = await bcrypt.hash('Admin123!', 10);
        
        const adminUser = new User();
        adminUser.email = 'admin@educativa.com';
        adminUser.password = hashedPassword;

        await userRepository.save(adminUser);
        console.log('Usuario administrador creado exitosamente');
    } catch (error) {
        console.error('Error al crear usuario administrador:', error);
    }
}
