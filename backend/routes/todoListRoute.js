import {Router} from 'express';
const router = Router();
import todoListController from "../controllers/todoListController.js";


router.get('/:id', todoListController.getById);
router.get('/', todoListController.getAll)
router.post('/create', todoListController.create);
router.delete('/:id', todoListController.delete);


export default router;