const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')
const { incrementViewCount, incrementLikeCount } = require('../controllers/blogController');

// Route to get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Route to get a single blog by id
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

// Route to create a blog (admin only)
router.post('/blogs', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// Route to update blog views
router.patch('/blogs/:id/view', incrementViewCount);

// Route to update blog likes
router.patch('/blogs/:id/like', incrementLikeCount);

module.exports = router;
