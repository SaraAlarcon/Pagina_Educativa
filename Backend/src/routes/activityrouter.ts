import { Router } from "express";
import { ActivityController } from "../controllers/activityController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();
const controller = new ActivityController();

// src/routes/activity.routes.ts
router.post("/", authenticateJWT, upload.single('file'), controller.create.bind(controller));
router.get("/docente/:docenteId", authenticateJWT, controller.getForTeacher.bind(controller));
router.get("/grupo/:grupoId", authenticateJWT, controller.getForStudent.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.put("/:id", authenticateJWT, upload.single('file'), controller.update.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));

export default router;