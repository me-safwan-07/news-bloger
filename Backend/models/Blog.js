import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'uncategorized'
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      unique: true, // Ensures slug is unique for each blog record
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
