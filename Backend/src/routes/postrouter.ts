// src/routes/post.routes.ts
import { Router } from "express";
import { PostController } from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/upload";
import { handleUploadError } from "../middlewares/upload";


const router = Router();
const postController = new PostController();

// Rutas para docentes
router.post(
  "/",
  authenticateJWT,
  upload.array('attachments', 5), // Máximo 5 archivos
  handleUploadError,
  postController.create.bind(postController)
);
router.put("/:id", authenticateJWT, postController.update.bind(postController));
router.delete("/:id", authenticateJWT, postController.delete.bind(postController));

// Rutas para alumnos
router.get("/grupo/:grupoId", authenticateJWT, postController.getForGrupo.bind(postController));
router.get("/docente/:docenteId", authenticateJWT, postController.getByDocente.bind(postController));
router.get("/:id", authenticateJWT, postController.getById.bind(postController));

export default router;