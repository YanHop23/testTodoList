import {Router} from 'express';
const router = Router();
import todoController from "../controllers/todoController.js";


router.get('/:id', todoController.getById);
router.get('/', todoController.getAll)
router.post('/create', todoController.create);
router.delete('/:id', todoController.delete);


export default router;