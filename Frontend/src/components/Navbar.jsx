import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link to="/" className="text-2xl font-bold hover:text-gray-200">News Blogger</Link>
        </div>
        <div className="space-x-0 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/create" className="hover:text-gray-200">Text Editor</Link>
          <Link to='/dashboard' className='hover:text-gray-200'>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
