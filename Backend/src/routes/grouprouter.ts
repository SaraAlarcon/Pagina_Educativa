// src/routes/grupo.routes.ts
import { Router } from "express";
import { GrupoController } from "../controllers/groupController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const controller = new GrupoController();

// src/routes/grupo.routes.ts
router.post("/", authenticateJWT, controller.create.bind(controller));
router.get("/", authenticateJWT, controller.list.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.put("/:id", authenticateJWT, controller.update.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
export default router;