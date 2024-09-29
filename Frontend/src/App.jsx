// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogPage';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './context/AuthContext';
import { Login } from './pages/Login';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Optional 404 route */}
      </Routes>
    </Router>
  );
};

export default App;
