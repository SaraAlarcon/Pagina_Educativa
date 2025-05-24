// src/repositories/PostRepository.ts
import { AppDataSource } from "../config/database";
import { Post } from "../entities/post";
import { Docente } from "../entities/Teacher";
import { CreatePostDto } from "../dtos/postdto/CreatePost";
import { UpdatePostDto } from "../dtos/postdto/UpdatePost";

export class PostRepository {
  private repository = AppDataSource.getRepository(Post);
  private docenteRepository = AppDataSource.getRepository(Docente);

  async create(data: CreatePostDto) {
    const docente = await this.docenteRepository.findOneBy({ id: data.docenteId });
    if (!docente) throw new Error("Docente no encontrado");

    const post = this.repository.create({
      title: data.title,
      content: data.content,
      attachments: data.attachments || [],
      docente
    });

    return await this.repository.save(post);
  }

  async update(id: number, data: UpdatePostDto) {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ["docente"]
    });
  }

  async findAllByDocente(docenteId: number) {
    return await this.repository.find({
      where: { docente: { id: docenteId } },
      relations: ["docente"],
      order: { createdAt: "DESC" }
    });
  }

  async findAllForGrupo(grupoId: number) {
    // Posts de los docentes asignados a este grupo
    return await this.repository.createQueryBuilder("post")
      .innerJoin("post.docente", "docente")
      .innerJoin("docente.grupos", "grupo")
      .where("grupo.id = :grupoId", { grupoId })
      .orderBy("post.createdAt", "DESC")
      .getMany();
  }
}

export const postRepository = new PostRepository();