const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the routes
const blogRoutes = require('./routes/blogRoutes');

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/news-blog';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', blogRoutes); // Blog routes (e.g., /api/blogs)

// Server listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
