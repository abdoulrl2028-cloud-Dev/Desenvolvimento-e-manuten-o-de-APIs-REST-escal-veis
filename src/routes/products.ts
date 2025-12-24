import { Router } from 'express';
import { productController } from '../controllers';

const router = Router();

// Rotas de produtos
router.get('/products', productController.getAllProducts);

export default router;
