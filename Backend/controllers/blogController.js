// Increment view count
const incrementViewCount = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      blog.views += 1;
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Error updating views' });
    }
  };
  
  // Increment like count
  const incrementLikeCount = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      blog.likes += 1;
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Error updating likes' });
    }
  };
  
  module.exports = { incrementViewCount, incrementLikeCount };
  