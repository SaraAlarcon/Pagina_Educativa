import { Router } from "express";
import { AlumnoController } from "../controllers/alumnoController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const alumnoController = new AlumnoController();

router.get("/", authenticateJWT, alumnoController.getAll.bind(alumnoController));
router.post("/", authenticateJWT, alumnoController.create.bind(alumnoController));
router.get("/:id", authenticateJWT, alumnoController.getById.bind(alumnoController));
router.put("/:id", authenticateJWT, alumnoController.update.bind(alumnoController));
router.delete("/:id", authenticateJWT, alumnoController.delete.bind(alumnoController));
router.get("/grupo/:grupoId", authenticateJWT, alumnoController.getByGrupo.bind(alumnoController));
router.post("/:alumnoId/cambiar-grupo", authenticateJWT, alumnoController.changeGrupo.bind(alumnoController));

export default router;