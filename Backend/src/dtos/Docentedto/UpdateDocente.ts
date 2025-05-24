// src/dtos/UpdateDocenteDto.ts
export class UpdateDocenteDto {
  NombreCompleto?: string;
  email!: string;
  password!: string;
  grupoIds?: number[];
}