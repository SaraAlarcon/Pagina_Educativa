import { Router } from "express";
import { ActivityController } from "../controllers/activityController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();
const controller = new ActivityController();

// src/routes/activity.routes.ts
router.post("/", authenticateJWT, upload.single('file'), asyncHandler(controller.create.bind(controller)));
router.get("/docente/:docenteId", authenticateJWT, asyncHandler(controller.getForTeacher.bind(controller)));
router.get("/grupo/:grupoId", authenticateJWT, asyncHandler(controller.getForStudent.bind(controller)));
router.get("/:id", authenticateJWT, asyncHandler(controller.getById.bind(controller)));
router.put("/:id", authenticateJWT, upload.single('file'), asyncHandler(controller.update.bind(controller)));
router.delete("/:id", authenticateJWT, asyncHandler(controller.delete.bind(controller)));


export default router;