// context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for existing token in local storage
        const token = localStorage.getItem('adminToken');
        if (token) {
            setAdmin(token);
            setIsLoggedIn(true); // Set logged in state to true
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });
            const token = response.data.token;
            setAdmin(token);
            setIsLoggedIn(true); // Set logged in state to true
            localStorage.setItem('adminToken', token); // Store token in local storage
        } catch (err) {
            console.error('Login failed:', err.response?.data.message || err.message);
            setError(err.response?.data.message || 'Login failed. Please try again.');
        }
    };

    const logout = () => {
        setAdmin(null);
        setIsLoggedIn(false);
        localStorage.removeItem('adminToken'); // Remove token on logout
    };

    return (
        <AuthContext.Provider value={{ admin, isLoggedIn, login, logout, error }}>
            {children}
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
