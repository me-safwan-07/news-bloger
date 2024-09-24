import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogrouter from './routes/blogRoutes.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,        // Required for backward compatibility
      useUnifiedTopology: true,     // Helps with handling MongoDB connections smoothly
    });
    console.log('MongoDB is connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);  // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

  const app = express();
  app.use(express.json());

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });

  app.use('/api/blog', blogrouter);

  app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
    }) 
  });
