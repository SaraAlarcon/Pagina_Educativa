export class UpdateUserDto {
    readonly name?: string;
    readonly email?: string;
    readonly password?: string;
    readonly role?: 'admin' | 'docente' | 'alumno';

    constructor(data: Partial<UpdateUserDto> = {}) {
        // Validar que al menos un campo sea proporcionado
        if (!data.name && !data.email && !data.password && !data.role) {
            throw new Error('Al menos un campo debe ser proporcionado para actualizar');
        }

        // Validación y asignación opcional para cada campo
        if (data.name !== undefined) {
            if (typeof data.name !== 'string' || data.name.trim() === '') {
                throw new Error('Name debe ser una cadena no vacía');
            }
            this.name = data.name.trim();
        }

        if (data.email !== undefined) {
            if (typeof data.email !== 'string' || !data.email.includes('@')) {
                throw new Error('Email debe ser una dirección válida');
            }
            this.email = data.email.trim();
        }

        if (data.password !== undefined) {
            if (typeof data.password !== 'string' || data.password.length < 8) {
                throw new Error('Password debe tener al menos 8 caracteres');
            }
            this.password = data.password;
        }

        if (data.role !== undefined) {
            if (!['admin', 'docente', 'alumno'].includes(data.role)) {
                throw new Error('Role debe ser: admin, docente o alumno');
            }
            this.role = data.role;
        }
    }
}