// src/routes/userRouter.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { isAdmin } from '../middlewares/adminMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const userController = new UserController();

router.post('/login', (req, res, next) => {
  userController.login(req, res).catch(next);
});
router.post('/logout', authenticate, userController.logout);
router.get('/validate', authenticate, userController.validateToken);

// Rutas básicas CRUD existentes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.get('/role/:role', userController.getByRole);

// Resto de tus rutas existentes...
router.post('/user', authenticate, isAdmin, userController.create);
router.put('/:id', authenticate, userController.update);
router.delete('/:id', authenticate, isAdmin, userController.delete);
router.post('/:userId/groups', authenticate, isAdmin, userController.addToGroup);
router.get('/profile', authenticate, userController.getProfile);

export default router;