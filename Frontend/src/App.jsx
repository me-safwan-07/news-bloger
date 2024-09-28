// src/App.js
import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import TextEditor from './components/TextEditor';
import "./App.css";
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogPage';
import Dashboard from './pages/Dashboard';
import UploadThumbnail from './pages/UploadThumbnail';
import AdminLogin from './components/AdminLogin';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        {!isLoggedIn ? (
          <AdminLogin onLogin={setIsLoggedIn}/>
        ): (
          <Dashboard />
        )}
        <Route path='/dashboard' element={<Dashboard/> } />
        <Route path='/upload-thumbnail/:id' element={<UploadThumbnail />} />
      </Routes>
    </Router>
  );
};

export default App;
