import { AppDataSource } from "../config/database";
import { Grupo } from "../entities/Grupo";
import { Docente } from "../entities/Teacher";
import { UpdateGrupoDto } from "../dtos/groupdto/UpdateGrupo";
import { CreateGrupoDto } from "../dtos/groupdto/CreateGrupoDto";

export class GrupoRepository {
  private repository = AppDataSource.getRepository(Grupo);

  async create(data: { nombre: string; docenteId: number }) {
    const docente = await AppDataSource.getRepository(Docente).findOneBy({ 
      id: data.docenteId 
    });
    if (!docente) throw new Error("Docente no encontrado");

    return this.repository.save({
      nombre: data.nombre,
      docente
    });
  }

  async update(id: number, data: UpdateGrupoDto) {
    const grupo = await this.repository.findOneBy({ id });
    if (!grupo) return null;

    if (data.nombre) grupo.nombre = data.nombre;

    if (data.docenteId) {
      const docente = await AppDataSource.getRepository(Docente).findOneBy({ id: data.docenteId });
      if (!docente) throw new Error("Docente no encontrado");
      grupo.docente = docente;
    }

    return this.repository.save(grupo);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async findById(id: number) {
    return this.repository.findOne({ 
      where: { id },
      relations: ["alumnos", "activities", "clases"] 
    });
  }

  async findAll() {
    return this.repository.find({ 
      relations: ["docente"] 
    });
  }

  async isGroupEmpty(id: number) {
    const grupo = await this.repository.findOne({
      where: { id },
      relations: ["alumnos", "activities", "clases"],
      select: ["id"]
    });

    if (!grupo) throw new Error("Grupo no encontrado");

    return (
      (!grupo.alumnos || grupo.alumnos.length === 0) &&
      (!grupo.activities || grupo.activities.length === 0) &&
      (!grupo.clases || grupo.clases.length === 0)
    );
  }
}

export const grupoRepository = new GrupoRepository();