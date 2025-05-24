// src/routes/class.routes.ts
import { Router } from "express";
import { ClassController } from "../controllers/classController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const classController = new ClassController();

// Middleware para manejar errores de async/await
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rutas para docentes
router.post("/", authenticateJWT, asyncHandler(classController.create.bind(classController)));
router.put("/:id", authenticateJWT, asyncHandler(classController.update.bind(classController)));
router.delete("/:id", authenticateJWT, asyncHandler(classController.delete.bind(classController)));

// Rutas para consulta (docentes y alumnos)
router.get("/grupo/:grupoId", authenticateJWT, asyncHandler(classController.getByGrupo.bind(classController)));
router.get("/docente/:docenteId", authenticateJWT, asyncHandler(classController.getByDocente.bind(classController)));
router.get("/:id", authenticateJWT, asyncHandler(classController.getById.bind(classController)));

export default router;