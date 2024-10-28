import express from 'express';

import newsRouter from './newsRoutes.js';
import categoryRouter from './categoryRoutes.js';
const router = express.Router();

router.use('/news', newsRouter);
router.use('/category', categoryRouter)

export default router;