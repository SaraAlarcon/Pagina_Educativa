
// src/dtos/UpdateAlumnoDto.ts
export class UpdateAlumnoDto {
  NombreCompleto?: string;
  email!: string;
  password!: string;
  grupoId?: number;
}