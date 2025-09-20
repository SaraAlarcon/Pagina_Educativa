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

  @Column({ nullable: true })
  docenteId!: number;

  @Column({ nullable: true })
  alumnoId!: number;

  // Relación con Docente
  @OneToOne(() => Docente, (docente) => docente.user)
  @JoinColumn({ name: "docenteId" })
  docente?: Docente;

  // Relación con Alumno
  @OneToOne(() => Alumno, (alumno) => alumno.user)
  @JoinColumn({ name: "alumnoId" })
  alumno?: Alumno;

  // Relación con Notificaciones
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages!: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages!: Message[];
}