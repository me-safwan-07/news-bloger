import express from 'express';

import newsRouter from './newsRoutes.js';

const router = express.Router();

router.use('/news', newsRouter);

export default router;