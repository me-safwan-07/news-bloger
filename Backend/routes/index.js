import express from 'express';
import apiRoutes from './api/index.js';

import { keys } from '../config/keys.js';
const { apiURL } = keys.app;

const router = express.Router();

const api = `/${apiURL}`;

router.use(api, apiRoutes);

router.use(api, (req, res) => res.status(404).json('No API route found'));

export default router;
