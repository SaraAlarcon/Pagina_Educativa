import { Request, Response } from "express";
import { TeacherService } from "../services/teacherservice";
import { CreateDocenteDto } from "../dtos/Docentedto/CreateDocente";
import { UpdateDocenteDto } from "../dtos/Docentedto/UpdateDocente";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  public async create(req: Request, res: Response) {
    try {
      const data: CreateDocenteDto = req.body;
      const docente = await this.teacherService.create(data);
      res.status(201).json(docente);
    } catch (error) {
      res.status(500).json({ message: "Error al crear docente",error });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const docente = await this.teacherService.findById(id);
      
      if (docente) {
        res.json(docente);
      } else {
        res.status(404).json({ message: "Docente no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener id del docente",error });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateDocenteDto = req.body;
      const docente = await this.teacherService.update(id, data);
      
      if (docente) {
        res.json(docente);
      } else {
        res.status(404).json({ message: "Docente no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar docente",error });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.teacherService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar docente",error });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const docentes = await this.teacherService.findAll();
      res.json(docentes);
    } catch (error) {
      res.status(500).json({ message: "Error interno al recuperar la lista de docentes",error });
    }
  }
}