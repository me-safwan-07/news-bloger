import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogrouter from './routes/blogRoutes.js';
import categoriesrouter from './routes/categoryRoutes.js';
// import dashboardrouter from './routes/dashboardRoutes.js';
import cors from 'cors';
// import adminRoutes from './routes/adminRoutes.js';
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
  app.use(express.urlencoded({ limit: '1mb', extended: true }));
  app.use(cors());  // Enable CORS for cross-origin requests
  app.use(express.json({ limit: '1mb'}));
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('/api/blog', blogrouter);
  app.use('/api/categories', categoriesrouter);

  // app.use('api/dashboard', dashboardrouter);
  app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
    }) 
  });