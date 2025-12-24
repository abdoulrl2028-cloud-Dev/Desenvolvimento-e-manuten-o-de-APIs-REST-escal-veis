import { Router } from 'express';
import { categoryController } from '../controllers';

const router = Router();

// Rotas de categorias
router.get('/categories', categoryController.getAll);

export default router;
