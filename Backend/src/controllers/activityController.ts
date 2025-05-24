import { Request, Response } from "express";
import { ActivityService } from "../services/activityservices";
import { CreateActivityDto,  } from "../dtos/activitydto/CreateActivity";
import {UpdateActivityDto} from "../dtos/activitydto/UpdateActivity"
import { authenticateJWT } from "../middlewares/authMiddleware";

export class ActivityController {
  private service = new ActivityService();

  async create(req: Request, res: Response) {
    try {
      const data: CreateActivityDto = req.body;
      
      if (req.file) {
        data.fileUrl = `/uploads/${req.file.filename}`;
      }

      const activity = await this.service.create(data);
      res.status(201).json(activity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message.includes("Tipo de archivo") 
          ? error.message 
          : "Error al crear actividad";
        res.status(400).json({ message });
      } else {
        res.status(500).json({ message: "Error desconocido al crear actividad" });
      }
    }
  }

  async getForTeacher(req: Request, res: Response) {
    try {
      const activities = await this.service.getByDocente(parseInt(req.params.docenteId));
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener actividades del docente" });
    }
  }

  async getForStudent(req: Request, res: Response) {
    try {
      const activities = await this.service.getByGrupo(parseInt(req.params.grupoId));
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener actividades del grupo" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const activity = await this.service.getById(parseInt(req.params.id));
      activity 
        ? res.json(activity)
        : res.status(404).json({ message: "Actividad no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la actividad" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: UpdateActivityDto = req.body;
      
      if (req.file) {
        data.fileUrl = `/uploads/${req.file.filename}`;
      }

      const updatedActivity = await this.service.update(
        parseInt(req.params.id), 
        data
      );

      updatedActivity
        ? res.json(updatedActivity)
        : res.status(404).json({ message: "Actividad no encontrada" });
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Error al actualizar actividad" 
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const success = await this.service.delete(parseInt(req.params.id));
      success
        ? res.status(204).send()
        : res.status(404).json({ message: "Actividad no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la actividad" });
    }
  }
}