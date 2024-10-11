import express from 'express'; 
import { 
    addCategories, 
    deleteCategory, 
    getCategories, 
    updateCategories 
} from '../controllers/categoryController.js';


const router = express.Router();

// Routes for blog operations
router.get('/', getCategories); 
router.post('/add', addCategories);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategories);

export default router;