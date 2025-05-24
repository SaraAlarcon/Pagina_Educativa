// src/services/GrupoService.ts
import { grupoRepository } from "../repository/GrupoRepository";
import { CreateGrupoDto } from "../dtos/groupdto/CreateGrupoDto";
import { UpdateGrupoDto } from "../dtos/groupdto/UpdateGrupo";

export class GrupoService {
  async create(data: CreateGrupoDto) {
    return await grupoRepository.create(data);
  }
  
  // Solo métodos esenciales
  async findById(id: number) {
    return await grupoRepository.findById(id);
  }

  async update(id: number, data: UpdateGrupoDto) {
    return await grupoRepository.update(id, data);
  }

  async deleteIfEmpty(id: number) {
    const grupo = await grupoRepository.findById(id);
    if (!grupo) throw new Error("Grupo no encontrado");
    
    // Verificar si tiene alumnos o asignaciones
    if (grupo.alumnos?.length > 0 || grupo.activities?.length > 0 || grupo.clases?.length > 0) {
      return false;
    }
    
    return await grupoRepository.delete(id);
  }
  async list() {
    return await grupoRepository.findAll();
  }
}