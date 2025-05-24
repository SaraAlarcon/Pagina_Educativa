import { Router } from "express";
import { TeacherController } from "../controllers/teacherController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const teacherController = new TeacherController();

router.get("/", authenticateJWT, teacherController.getAll.bind(teacherController));
router.post("/", authenticateJWT, teacherController.create.bind(teacherController));
router.get("/:id", authenticateJWT, teacherController.getById.bind(teacherController));
router.put("/:id", authenticateJWT, teacherController.update.bind(teacherController));
router.delete("/:id", authenticateJWT, teacherController.delete.bind(teacherController));
 

export default router;