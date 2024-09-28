// import multer from "multer";
import Blog from "../models/Blog.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {

  // Create a slug from the title
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

  try {
    const { title, content} = req.body;

    const newBlog = new Blog({
      title,
      content,
      slug
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully.' });
  } catch (err) {
    console.log(err)
    next(err);
  }
};

// Get all blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ updatedAt: -1});
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
}

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
