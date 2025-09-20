import { Request, Response } from "express";
import { GrupoService } from "../services/groupservices";
import { CreateGrupoDto } from "../dtos/groupdto/CreateGrupoDto";
import { UpdateGrupoDto } from "../dtos/groupdto/UpdateGrupo";

export class GrupoController {
  private service = new GrupoService();

   async create(req: Request, res: Response) {
    try {
      const data: CreateGrupoDto = req.body;
      const grupo = await this.service.create(data);
      res.status(201).json({message: "Grupo Registrado Exitosamente"});
    } catch (error) {
      res.status(400).json({ message: "Error al crear grupo" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const groups = await this.service.list();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: "Error al listar grupos" });
    }
  }

  async getById(req: Request, res: Response) :Promise<void>{ 
    try {
      const id = parseInt(req.params.id);
      const grupo = await this.service.findById(id);
      
      if (!grupo) {
         res.status(404).json({ message: "Grupo no encontrado" });
      }
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener grupo" });
    }
  }

  async update(req: Request, res: Response) :Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateGrupoDto = req.body;
      const grupo = await this.service.update(id, data);
      
      if (!grupo) {
        res.status(404).json({ message: "Grupo no encontrado" });
      }
      res.json({message: "Grupo Actualizado Exitosamente"});
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar grupo" });
    }
  }

  async delete(req: Request, res: Response) :Promise<void>{
    try {
      const id = parseInt(req.params.id);
      const result = await this.service.deleteIfEmpty(id);
      
      if (!result) {
         res.status(400).json({ message: "Grupo no está vacío" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar grupo" });
    }
  }
}