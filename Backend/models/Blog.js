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
    // image: {
    //   type: String,
    // },
    category: {
      type: String,
      default: 'uncategorized'
    },
    slug:{
      type:String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
