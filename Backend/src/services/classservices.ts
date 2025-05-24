// src/services/ClassService.ts
import { classRepository } from "../repository/ClassRepository";
import { CreateClassDto } from "../dtos/classdto/CreateClass";
import{UpdateClassDto} from "../dtos/classdto/UpdateClass"

export class ClassService {
  async create(data: CreateClassDto, docenteId: number) {
    return await classRepository.create(data, docenteId);
  }

  async update(id: number, data: UpdateClassDto) {
    return await classRepository.update(id, data);
  }

  async delete(id: number) {
    return await classRepository.delete(id);
  }

  async getById(id: number) {
    return await classRepository.findById(id);
  }

  async getByGrupo(grupoId: number) {
    return await classRepository.findByGrupo(grupoId);
  }

  async getByDocente(docenteId: number) {
    return await classRepository.findByDocente(docenteId);
  }
}