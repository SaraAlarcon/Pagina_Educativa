// src/controllers/ClassController.ts
import { Request, Response } from "express";
import { ClassService } from "../services/classservices";
import { CreateClassDto } from "../dtos/classdto/CreateClass";
import {UpdateClassDto} from "../dtos/classdto/UpdateClass"
export class ClassController {
  private classService = new ClassService();

 async create(req: Request, res: Response) {
    try {
      const docenteId = (req as any).user?.id;
      if (!docenteId) return res.status(401).json({ message: "No autorizado" });

      const newClass = await this.classService.create(req.body, docenteId);
      return res.status(201).json(newClass);
      
    } catch (error: any) {
      const message = error.message?.includes("no encontrado") 
        ? error.message 
        : "Error al crear la clase";
      return res.status(400).json({ message });
    }
}
async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateClassDto = req.body;
      const updatedClass = await this.classService.update(id, data);
      
      if (!updatedClass) {
        return res.status(404).json({ message: "Clase no encontrada" });
      }
      
      res.json(updatedClass);
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar la clase";
      
      if (error instanceof Error) {
        errorMessage = error.message.includes("no encontrad") 
          ? error.message 
          : errorMessage;
      }
      
      res.status(400).json({ message: errorMessage });
    }
}

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.classService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar la clase" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const classItem = await this.classService.getById(id);
      classItem ? res.json(classItem) : res.status(404).json({ message: "Clase no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la clase" });
    }
  }

  async getByGrupo(req: Request, res: Response) {
    try {
      const grupoId = parseInt(req.params.grupoId);
      const classes = await this.classService.getByGrupo(grupoId);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las clases del grupo" });
    }
  }

  async getByDocente(req: Request, res: Response) {
    try {
      const docenteId = parseInt(req.params.docenteId);
      const classes = await this.classService.getByDocente(docenteId);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las clases del docente" });
    }
  }
}