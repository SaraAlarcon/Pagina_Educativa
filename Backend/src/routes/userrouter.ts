// src/routes/userRouter.ts
import { Router, RequestHandler } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();
const userController = new UserController();

// Rutas de autenticación
router.post('/login', userController.login as unknown as RequestHandler);
router.post('/logout', authenticateJWT, (req, res) => userController.logout(req, res));
router.get('/validate', authenticateJWT, (req, res) => userController.validateToken(req, res));

// Ruta de perfil
router.get('/profile', authenticateJWT, (req, res) => userController.getProfile(req, res));

export default router;