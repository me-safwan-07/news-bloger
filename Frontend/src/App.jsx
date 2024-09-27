// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import TextEditor from './components/TextEditor';
import "./App.css";
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
