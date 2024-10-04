// import multer from "multer";
import Blog from "../models/Blog.js";
import { errorHandler } from "../utils/error.js";
// import slugify from 'slugify'; // Import slugify at the top

export const create = async (req, res, next) => {
  const { title, content, image } = req.body;

  // Input validation
  if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
  }
  const slug = Math.floor(1000 + Math.random() * 9000); // Keep it simple without strict mode
  const newBlog = new Blog({
    ...req.body,
    slug,
  });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json({ 
        message: 'Blog created successfully.', 
        blog: savedBlog  // Include the created blog in the response
      });
  } catch (err) {
      console.error('Error creating blog:', err);
      next(err);  // Pass the error to the next middleware for handling
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


export const getBlogStats = async (req, res, next) => {
  try {
      // Get total number of posts
      const totalBlogs = await Blog.countDocuments();

      // Get views per blog per month (assuming you have a 'views' field and a 'createdAt' filed)
      const blogViewsPerMonth = await Blog.aggregate([
          {
            $group: {
              _id: { month: { $month: "$createdAt" }},
              totalViews: { $sum: "$views" },
              totalBlogs: { $sum: 1},
            },
          },
          {
            $sort: { '_id.month': 1}
          }
      ]);

      // You can add more aggregations like most popular blog, total views, etc.
      res.json({ totalBlogs, blogViewsPerMonth });
  } catch (err) {
      console.error(err)
      next(err);
  }
};

