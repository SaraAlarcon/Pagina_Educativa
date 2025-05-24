// src/entities/Grupo.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Docente } from "./Teacher";
import { Alumno } from "./Alumno";
import { Post } from "./post";
import { Activity } from "./activity";
import { Class } from "./class";

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @ManyToOne(() => Docente, (docente) => docente.grupos)
  docente!: Docente;

  @OneToMany(() => Alumno, (alumno) => alumno.grupo)
  alumnos!: Alumno[];

  @OneToMany(() => Activity, (activity) => activity.grupo)
  activities!: Activity[];

  @OneToMany(() => Class, (classEntity) => classEntity.grupo)
  clases!: Class[];
}