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
    slug:{
      type:String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
