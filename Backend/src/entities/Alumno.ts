// src/entities/Alumno.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  OneToMany, OneToOne } from "typeorm";
import { User } from "./user";
import { Grupo } from "./Grupo";
import { ActivitySubmission } from "./ActivitySubmission";

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  NombreCompleto!: string;
  
  // Relación 1:1 con User (para autenticación)
  @OneToOne(() => User, (user) => user.alumno)
  user!: User;

  // Relación con el grupo al que pertenece
  @ManyToOne(() => Grupo, (grupo) => grupo.alumnos)
  grupo!: Grupo;

  @OneToMany(() => ActivitySubmission, (submission) => submission.alumno)
  entregas!: ActivitySubmission[];
}