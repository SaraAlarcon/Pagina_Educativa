// src/entities/Notification.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({ default: false })
  seen!: boolean;

  @Column({ type: "enum", enum: ["activity", "class", "post", "message"] })
  type!: "activity" | "class" | "post" | "message";

  @Column()
  referenceId!: number;

  // Si es una notificación individual
  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  user?: User;

  // Si es una notificación global
  @Column({ default: false })
  global!: boolean;

  // Grupo al que va dirigida (si aplica)
  @Column({ nullable: true })
  grupoId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
