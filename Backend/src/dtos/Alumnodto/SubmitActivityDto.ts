// src/dtos/Alumnodto/SubmitActivityDto.ts
export class SubmitActivityDto {
  alumnoId!: number;
  actividadId!: number;
  fileUrl!: string;
  comentario?: string;
}