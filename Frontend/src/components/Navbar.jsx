// src/components/Navbar.js (already used Tailwind CSS)
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold hover:text-gray-200">News Blogger</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/create" className="hover:text-gray-200">Text Editor</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
