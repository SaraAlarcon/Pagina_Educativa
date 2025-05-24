// src/dtos/Notificationdto/CreateNotification.ts
export class CreateNotificationDto {
  message!: string;
  type!: "activity" | "class" | "post" | "message"; // Ajustado para coincidir con la entidad
  referenceId!: number;
  userId?: number;
  grupoId?: number;
  global?: boolean;
}