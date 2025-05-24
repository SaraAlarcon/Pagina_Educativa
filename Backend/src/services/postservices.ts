// src/services/PostService.ts
import { postRepository } from "../repository/PostRepository";
import { CreatePostDto,  } from "../dtos/postdto/CreatePost";
import {UpdatePostDto} from "../dtos/postdto/UpdatePost"

export class PostService {
  async create(data: CreatePostDto) {
    return await postRepository.create(data);
  }

  async update(id: number, data: UpdatePostDto) {
    return await postRepository.update(id, data);
  }

  async delete(id: number) {
    return await postRepository.delete(id);
  }

  async getById(id: number) {
    return await postRepository.findById(id);
  }

  async getByDocente(docenteId: number) {
    return await postRepository.findAllByDocente(docenteId);
  }

  async getForGrupo(grupoId: number) {
    return await postRepository.findAllForGrupo(grupoId);
  }
}