import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
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
    views: {
      type: Number,
      default: 0,
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

const News = mongoose.model('News', NewsSchema);

export default News;
