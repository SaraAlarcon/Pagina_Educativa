export class CreateActivityDto {
  title!: string;
  feedback!: string;
  grade!: number;
  fileUrl?: string;
  docenteId!: number;
  grupoId!: number; // Ahora es obligatorio (siempre debe asignarse a un grupo)
}
