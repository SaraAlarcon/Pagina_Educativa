import { activityRepository } from "../repository/ActivityRepository";
import { CreateActivityDto,  } from "../dtos/activitydto/CreateActivity";
import{UpdateActivityDto} from "../dtos/activitydto/UpdateActivity"
import fs from 'fs';
import path from 'path';

export class ActivityService {
  async create(data: CreateActivityDto) {
    return await activityRepository.create(data);
  }

  async getByDocente(docenteId: number) {
    return await activityRepository.findByDocente(docenteId);
  }

  async getByGrupo(grupoId: number) {
    return await activityRepository.findByGrupo(grupoId);
  }

  async getById(id: number) {
    return await activityRepository.findById(id);
  }

  async update(id: number, data: UpdateActivityDto) {
    return await activityRepository.update(id, data);
  }

  async delete(id: number) {
    const activity = await activityRepository.findById(id);
    if (!activity) return false;
    
    if (activity.fileUrl) {
      try {
        const filePath = path.join(__dirname, '..', '..', activity.fileUrl);
        fs.unlinkSync(filePath);
      } catch (error) {
        console.warn("No se pudo eliminar el archivo adjunto", error);
      }
    }
    
    return await activityRepository.delete(id);
  }
}