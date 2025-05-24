// src/entities/Teacher.ts
import {
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany
} from "typeorm";
import { User } from "./user";
import { Class } from "./class";
import { Grupo } from "./Grupo";
import { Activity } from "./activity";
import { Post } from "./post";

@Entity()
export class Docente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  NombreCompleto!: string;

  @OneToOne(() => User, (user) => user.docente)
  user!: User;

  @OneToMany(() => Class, (clase) => clase.docente)
  clases!: Class[];

  @ManyToMany(() => Grupo, (grupo) => grupo.docente)
  grupos!: Grupo[];

  @OneToMany(() => Activity, (activity) => activity.docente)
  activities!: Activity[];

  @OneToMany(() => Post, (post) => post.docente) 
  posts!: Post[];
}
