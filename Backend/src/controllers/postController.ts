// src/controllers/PostController.ts
import { Request, Response } from "express";
import { PostService } from "../services/postservices";
import { CreatePostDto,  } from "../dtos/postdto/CreatePost";
import{UpdatePostDto} from "../dtos/postdto/UpdatePost"

export class PostController {
  private postService = new PostService();

 // Modifica el método create en PostController.ts
async create(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[];
    const attachments = files?.map(file => `/uploads/${file.filename}`) || [];
    
    const data: CreatePostDto = {
      ...req.body,
      docenteId: parseInt(req.body.docenteId),
      attachments
    };
    
    const post = await this.postService.create(data);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el post" });
  }
}

 async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const post = await this.postService.update(id, req.body);
      post ? res.json(post) : res.status(404).json({ message: "Post no encontrado" });
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar el post" });
    }
}

 async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.postService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar el post" });
    }
}

  async getForGrupo(req: Request, res: Response) {
    try {
      const grupoId = parseInt(req.params.grupoId);
      const posts = await this.postService.getForGrupo(grupoId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener posts del grupo" });
    }
  }

  async getByDocente(req: Request, res: Response) {
    try {
      const docenteId = parseInt(req.params.docenteId);
      const posts = await this.postService.getByDocente(docenteId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener posts del docente" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const post = await this.postService.getById(id);
      post ? res.json(post) : res.status(404).json({ message: "Post no encontrado" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el post" });
    }
  }
}