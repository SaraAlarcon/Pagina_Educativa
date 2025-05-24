// src/repositories/ClassRepository.ts
import { AppDataSource } from "../config/database";
import { Class } from "../entities/class";
import { Docente } from "../entities/Teacher";
import { Grupo } from "../entities/Grupo";
import { CreateClassDto } from "../dtos/classdto/CreateClass";
import { UpdateClassDto } from "../dtos/classdto/UpdateClass";
import { In } from "typeorm";

export class ClassRepository {
  private repository = AppDataSource.getRepository(Class);
  private docenteRepository = AppDataSource.getRepository(Docente);
  private grupoRepository = AppDataSource.getRepository(Grupo);

  async create(data: CreateClassDto, docenteId: number) {
    const docente = await this.docenteRepository.findOneBy({ id: docenteId });
    if (!docente) throw new Error("Docente no encontrado");

    const grupo = await this.grupoRepository.findOneBy({ id: data.grupoId });
    if (!grupo) throw new Error("Grupo no encontrado");

    const newClass = this.repository.create({
      title: data.title,
      description: data.description,
      attachments: data.attachments || [],
      docente,
      grupo
    });

    return await this.repository.save(newClass);
  }

  async update(id: number, data: UpdateClassDto) {
    const existingClass = await this.repository.findOneBy({ id });
    if (!existingClass) throw new Error("Clase no encontrada");

    if (data.grupoId) {
      const grupo = await this.grupoRepository.findOneBy({ id: data.grupoId });
      if (!grupo) throw new Error("Grupo no encontrado");
      existingClass.grupo = grupo;
    }

    if (data.title) existingClass.title = data.title;
    if (data.description) existingClass.description = data.description;
    if (data.attachments) existingClass.attachments = data.attachments;

    return await this.repository.save(existingClass);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ["docente", "grupo"]
    });
  }

  async findByGrupo(grupoId: number) {
    return await this.repository.find({
      where: { grupo: { id: grupoId } },
      relations: ["docente"],
      order: { createdAt: "DESC" }
    });
  }

  async findByDocente(docenteId: number) {
    return await this.repository.find({
      where: { docente: { id: docenteId } },
      relations: ["grupo"],
      order: { createdAt: "DESC" }
    });
  }
}

export const classRepository = new ClassRepository();