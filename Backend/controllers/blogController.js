import multer from "multer";
import Blog from "../models/Blog.js";
import { errorHandler } from "../utils/error.js";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Save file with a timestamp to avoid naming conflicts
  },
});

const upload = multer({ storage });

// Create a blog post
export const create = async (req, res, next) => {
  // Handle the image upload using Multer
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return next(errorHandler(500, 'Error uploading image'));
    }

    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    // Create a slug from the title
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    // Prepare the new blog post
    const newBlog = new Blog({
      ...req.body,
      slug,
      image: req.file ? req.file.path : null, // Save image path if uploaded
    });

    try {
      const savedPost = await newBlog.save();
      res.status(201).json(savedPost);
    } catch (err) {
      next(err);
    }
  });
};

// Get all blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(errorHandler(404, 'Blog not found'));
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Update a blog by ID
export const updateBlog = async (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return next(errorHandler(500, 'Error uploading image'));

    try {
      const updatedData = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
      };

      if (req.file) {
        updatedData.image = req.file.path; // Update image if a new one is uploaded
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData },
        { new: true }
      );

      res.status(200).json(updatedBlog);
    } catch (err) {
      next(err);
    }
  });
};
