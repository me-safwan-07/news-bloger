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
import "./App.css"
import DashboardProvider from './context/DashboardContext';
import AdminLogin from './pages/AdminLogin';
import DashboardCategory from './components/dashboard/DashboardCategory';
import CategoryPage from './pages/CategoryPage';
const Routers = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      {/* <Navbar /> */}
      <DashboardProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/dashboard" /> : <AdminLogin />} />
        {/* <Route path='/login' element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/categorys' element={<DashboardCategory />} />
        <Route path='/:category' element={<CategoryPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Optional 404 route */}
      </Routes>
      </DashboardProvider>
    </Router>
  );
};

export default Routers;
