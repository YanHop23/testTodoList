import { Router } from 'express';
import UserRouter from './userRoute.js';
import TodoRoute from "./todoRoute.js";
import TodoListRoute from "./todoListRoute.js";
const router = Router();

router.use('/todo', TodoRoute)
router.use('/user', UserRouter)
router.use('/todolist', TodoListRoute)

export default router;