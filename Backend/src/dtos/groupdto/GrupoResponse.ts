export class GrupoResponseDto {
  id!: number;
  nombre!: string;
  docente!: {
    id: number;
    NombreCompleto: string;
  };
  alumnosCount?: number;
}