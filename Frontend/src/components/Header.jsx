import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { WebsiteName } from '../data'; // Ensure this is correctly imported
import { AuthContext } from '../context/AuthContext'; // Ensure AuthContext is correctly set up

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext); // Check if isLoggedIn is correctly provided
    const [date, setDate] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const currentDate = new Date();
            const optionsDate = { 
                month: 'short',   
                day: '2-digit',   
                year: 'numeric'    
            };
            const formattedDate = currentDate.toLocaleDateString('en-US', optionsDate);
            setDate(formattedDate);
        };
        updateDate();
    }, []);

    return (
        <div className="flex border items-center justify-between p-4">
            {/* Displaying Date */}
            <span className="border text-xs md:text-sm lg:text-base">{date}</span>

            {/* Website Name */}
            <span className="text-lg md:text-xl lg:text-2xl font-bold">
                <Link to="/">{WebsiteName.toUpperCase()}</Link>
            </span>

            {/* Conditional Rendering Based on Auth Status */}
            {isLoggedIn === false ? (
                <span>
                    <Link to="/login" className="text-xs md:text-sm lg:text-base">SIGN IN</Link>
                </span>
            ) : (
                <span>
                    <Link to="/dashboard" className="text-xs md:text-sm lg:text-base">Dashboard</Link>
                </span>
            )}
        </div>
    );
};

export default Header;
