import express from 'express'; 
import {
    getSingleNewsViews
} from '../controllers/dashboardController.js'

const router = express.Router();

// Routes for blog operations
router.get('/newsviews', getSingleNewsViews);

export default router;