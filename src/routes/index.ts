import { Router } from 'express';
import userRoutes from './users';
import productRoutes from './products';
import categoryRoutes from './categories';
import orderRoutes from './orders';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);
router.use('/api', categoryRoutes);
router.use('/api', orderRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API está online',
    timestamp: new Date().toISOString(),
  });
});

export default router;
