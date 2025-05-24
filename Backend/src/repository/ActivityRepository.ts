import { AppDataSource } from "../config/database";
import { Activity } from "../entities/activity";
import { CreateActivityDto } from "../dtos/activitydto/CreateActivity";
import{UpdateActivityDto} from "../dtos/activitydto/UpdateActivity"
import { Docente } from "../entities/Teacher";
import { Grupo } from "../entities/Grupo";
import fs from 'fs';
import path from 'path';

const ALLOWED_EXTENSIONS = [
  'png', 'txt', 'zip', 'rar', 'ppt', 'pptx', 'pdf', 
  'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg'
];

export class ActivityRepository {
  private repository = AppDataSource.getRepository(Activity);

  public validateFileExtension(fileUrl?: string) {
    if (!fileUrl) return;
    
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      throw new Error(`Tipo de archivo no permitido. Formatos aceptados: ${ALLOWED_EXTENSIONS.join(', ')}`);
    }
  }

  async create(data: CreateActivityDto) {
    this.validateFileExtension(data.fileUrl);
    const activity = this.repository.create(data);
    return this.repository.save(activity);
  }

  async findById(id: number) {
    return this.repository.findOne({ 
      where: { id },
      relations: ["docente", "grupo"]
    });
  }

  async update(id: number, data: UpdateActivityDto) {
    this.validateFileExtension(data.fileUrl);
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByDocente(docenteId: number) {
    return this.repository.find({ 
      where: { docente: { id: docenteId } },
      relations: ["grupo"]
    });
  }

  async findByGrupo(grupoId: number) {
    return this.repository.find({
      where: { grupo: { id: grupoId } },
      relations: ["docente"]
    });
  }
}

export const activityRepository = new ActivityRepository();