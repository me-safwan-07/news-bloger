import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navOptions, setNavOptions] = useState([]);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchNavOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories/');
        setNavOptions(response.data);
      } catch (err) {
        console.error('Error fetching navigation options:', err);
        setError('Failed to load navigation options.'); // Set error message
      }
    };

    fetchNavOptions();
  }, []);

  return (
    <nav className="p-2 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>
          {error ? (
            <span className="text-red-500">{error}</span> // Display error message
          ) : (
            navOptions.map((nav, index) => (
              <Link key={index} to={`/${nav.category.toLowerCase()}`} className="hover:text-gray-500">
                {nav.category}
              </Link>
            ))
          )}
          <Link to="/dashboard" className="hover:text-gray-500">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
