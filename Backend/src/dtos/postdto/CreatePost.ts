export class CreatePostDto {
  title!: string;
  content!: string;
  attachments?: string[]; // Array de URLs de archivos
  docenteId!: number; // ID del docente que crea el post
}