// src/routes/notification.routes.ts
import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const notificationController = new NotificationController();

// Rutas para usuarios autenticados
router.get("/me", authenticateJWT, notificationController.getMyNotifications.bind(notificationController));
router.post("/mark-seen", authenticateJWT, notificationController.markSeen.bind(notificationController));

// Ruta para uso interno (por otros servicios)
router.post("/", authenticateJWT, notificationController.createNotification.bind(notificationController));

export default router;