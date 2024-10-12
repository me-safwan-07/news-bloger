import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navOptions, setNavOptions] = useState([]);

  useEffect(() => {
    const fetchNavOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories/');
        setNavOptions(response.data);
      } catch (err) {
        console.error('Error fetching navigation options:', err);
      }
    }
    fetchNavOptions();
  }, []);
  return (
    <nav className="p-2 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
          <Link to={"/home"} className="hover:text-gray-500">
              Home
          </Link>
          {navOptions.map((nav, index) => (
            <Link key={index} to={"/${nav.category}"} className="hover:text-gray-500">
              {nav.category}
            </Link>
          ))}
          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
