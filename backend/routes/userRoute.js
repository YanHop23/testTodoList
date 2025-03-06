import {Router} from 'express';
const router = Router();
import userController from '../controllers/userController.js';
import authMiddleware from "../middleware/authMiddleware.js";


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth',authMiddleware, userController.check)

export default router;