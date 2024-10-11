import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  // Array of links
  const links = [
    { to: '/', label: 'Home' },
  ].filter(Boolean); // Filter out null values

  return (
    <nav className="p-2 shadow-lg">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="hover:text-gray-500">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
