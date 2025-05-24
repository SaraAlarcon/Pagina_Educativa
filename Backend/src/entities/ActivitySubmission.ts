// src/entities/ActivitySubmission.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Alumno } from "./Alumno";
import { Activity } from "../entities/activity";

@Entity()
export class ActivitySubmission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fileUrl!: string;

  @Column({ nullable: true })
  comentario?: string;

  @ManyToOne(() => Alumno, (alumno) => alumno.entregas)
  alumno!: Alumno;

  @ManyToOne(() => Activity, (activity) => activity.entregas)
  activity!: Activity;
}