// src/routes/message.routes.ts
import { Router } from "express";
import { MessageController } from "../controllers/MessageController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const controller = new MessageController();

router.post("/", authenticateJWT, controller.sendMessage);
router.get("/conversation/:userId1/:userId2", authenticateJWT, controller.getConversation);
router.get("/user/:userId", authenticateJWT, controller.getUserMessages);

export default router;