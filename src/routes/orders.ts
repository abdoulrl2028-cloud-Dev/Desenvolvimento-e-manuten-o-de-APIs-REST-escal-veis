import { Router } from 'express';
import { orderController } from '../controllers';

const router = Router();

// Rotas de pedidos
router.get('/orders', orderController.getAll);

export default router;
