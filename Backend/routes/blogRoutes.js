import express from 'express';
import multer  from 'multer';
import Blog  from '../models/Blog.js'; // Adjust the import according to your structure
import path  from 'path';
import { create, getBlogs, getBlogById, deleteBlog, updateBlog, getBlogStats } from '../controllers/blogController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
  
const upload = multer({ storage: storage });

// Routes for blog operations
router.post('/create', create);          // Create a new blog
router.get('/get/', getBlogs);           // Get all blogs
router.get('/get/:id', getBlogById); // Get
router.delete('/delete/:id', deleteBlog); // Delete a blog by ID
router.put('/update/:id', updateBlog);   // Update a blog by ID
router.get('/stats', getBlogStats);
// Endpoint to upload thumbnail
router.post('/:id/upload-thumbnail', upload.single('thumbnail'), async (req, res) => {
  try {
    const blogId = req.params.id;
    const thumbnailPath = req.file.path; // Path of the uploaded file

    const blog = await Blog.findByIdAndUpdate(blogId, { thumbnail: thumbnailPath }, { new: true });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Thumbnail uploaded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while uploading thumbnail' });
  }
});

export default router;
