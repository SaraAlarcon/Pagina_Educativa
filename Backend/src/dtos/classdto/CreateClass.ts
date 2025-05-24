export class CreateClassDto {
  title!: string;
  description!: string;
  attachments?: string[]; // URLs de los archivos
  grupoId!: number;
}