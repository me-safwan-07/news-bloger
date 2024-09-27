import express from 'express';
import { create, getBlogs, getBlogById, deleteBlog, updateBlog } from '../controllers/blogController.js';

const router = express.Router();

// Routes for blog operations
router.post('/create', create);          // Create a new blog
router.get('/get/', getBlogs);           // Get all blogs
router.get('/get/:id', getBlogById); // Get
router.delete('/delete/:id', deleteBlog); // Delete a blog by ID
router.put('/update/:id', updateBlog);   // Update a blog by ID

export default router;
