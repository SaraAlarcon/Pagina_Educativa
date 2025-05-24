import { Request, Response } from "express";
import { AlumnoService } from "../services/alumnoservices";
import { CreateAlumnoDto } from "../dtos/Alumnodto/CreateAlumno";
import { UpdateAlumnoDto  } from "../dtos/Alumnodto/UpdateAlumno";

export class AlumnoController {
  private alumnoService: AlumnoService;

  constructor() {
    this.alumnoService = new AlumnoService();
  }

  public async create(req: Request, res: Response) {
    try {
      const data: CreateAlumnoDto = req.body;
      const alumno = await this.alumnoService.create(data);
      res.status(201).json(alumno);
    } catch (error) {
      res.status(500).json({ message: "error al crear alumno", error });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const alumno = await this.alumnoService.findById(id);
      
      if (alumno) {
        res.json(alumno);
      } else {
        res.status(404).json({ message: "Alumno no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "error al obtener el id del alumno",error });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateAlumnoDto = req.body;
      const alumno = await this.alumnoService.update(id, data);
      
      if (alumno) {
        res.json(alumno);
      } else {
        res.status(404).json({ message: "Alumno no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar alumno",error });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.alumnoService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "error al eliminar alumno",error });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const alumnos = await this.alumnoService.findAll();
      res.json(alumnos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la lista de alumnos",error });
    }
  }

  public async getByGrupo(req: Request, res: Response) {
    try {
      const grupoId = parseInt(req.params.grupoId);
      const alumnos = await this.alumnoService.findByGrupo(grupoId);
      res.json(alumnos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener alumnos por grupo",error });
    }
  }

  public async changeGrupo(req: Request, res: Response) {
    try {
      const alumnoId = parseInt(req.params.alumnoId);
      const grupoId = parseInt(req.body.grupoId);
      const alumno = await this.alumnoService.changeGrupo(alumnoId, grupoId);
      res.json(alumno);
    } catch (error) {
      res.status(500).json({ message: "Error al cambiar el grupo del alumno ",error });
    }
  }
}