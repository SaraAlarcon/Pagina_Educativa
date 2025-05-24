import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Docente } from "./Teacher";
import { Grupo } from "./Grupo";

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column("simple-array", { nullable: true })
  attachments!: string[]; // Aquí puedes incluir videos, imágenes, PDFs, etc.

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relación con el docente que crea la clase
  @ManyToOne(() => Docente, (docente) => docente.clases, { onDelete: 'CASCADE' })
  docente!: Docente;

  // Relación con el grupo al que va dirigida la clase
  @ManyToOne(() => Grupo, (grupo) => grupo.clases, { onDelete: 'CASCADE' })
  grupo!: Grupo;
}
