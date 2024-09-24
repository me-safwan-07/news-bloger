import Blog from "../models/Blog.js";
import { errorHandler } from "../utils/error.js";

// crate the post middleware
export const create = async (req, res, next) => {
  // add the admin or not 

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'please provide all required fields'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newBlog = new Blog({
    ...req.body,
    slug,
  });
  try {
    const savedPost = await newBlog.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
}

// get the all the blog
export const getBlogs = async (req, res, next) => {
  try {
    // take the all the blog posts
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
}

// Delete the custom blog
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(errorHandler(404, 'Blog not found'));
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

// Update the custom blog
export const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true}
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};