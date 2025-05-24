// src/entities/Activity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
    OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Docente } from "./Teacher";
import { Grupo } from "./Grupo";
import { ActivitySubmission } from "./ActivitySubmission";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  feedback!: string;

  @Column() // Tipo simple sin decimal
  grade!: number;

  @Column({ nullable: true })
  fileUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // src/entities/Activity.ts
  @ManyToOne(() => Docente, (docente) => docente.activities, { nullable: false })
  docente!: Docente;


  @ManyToOne(() => Grupo, { nullable: true })
  grupo?: Grupo;

  @Column({ default: false })
  esParaTodos!: boolean;

  @OneToMany(() => ActivitySubmission, (submission) => submission.activity)
  entregas!: ActivitySubmission[];
}