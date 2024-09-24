import express from 'express';
import { create, getBlogs, deleteBlog, updateBlog} from '../controllers/blogController.js';

const router = express.Router();

// Route to get all blogs
router.post('/create', create);
router.get('/get', getBlogs);
router.delete('/delete/:id', deleteBlog);
router.put('/update/:id', updateBlog);

export default router;