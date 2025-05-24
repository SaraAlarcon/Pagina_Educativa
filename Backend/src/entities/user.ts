// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Docente } from "./Teacher";
import { Alumno } from "./Alumno";
import { Notification } from "./notification";
import { Message } from "./message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Relación con Docente (si existe, es docente)
  @OneToOne(() => Docente, (docente) => docente.user, { nullable: true })
  @JoinColumn()
  docente?: Docente;

  // Relación con Alumno (si existe, es alumno)
  @OneToOne(() => Alumno, (alumno) => alumno.user, { nullable: true })
  @JoinColumn()
  alumno?: Alumno;

  
  // Relación con Notificaciones
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  // src/entities/User.ts

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages!: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages!: Message[];
}