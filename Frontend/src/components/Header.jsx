import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { WebsiteName } from '../data';
import { AuthContext } from '../context/AuthContext';
import { IoMdSearch } from "react-icons/io";
import { states } from '../data';
import { IoLocationSharp } from "react-icons/io5";
import { LuCloudSunRain } from "react-icons/lu";
const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [date, setDate] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [currentStateIndex, setCurrentStateIndex] = useState(0);
    const [navOptions, setNavOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const currentDate = new Date();
            const optionsDate = {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric'    
            };
            const formattedDate = currentDate.toLocaleDateString('en-US', optionsDate);
            setDate(formattedDate);
        };
        updateDate();
    }, []);

    const apiKey = '5fe4eee35594b9103d517262afb226f8'; // Ensure you set your API key here

    useEffect(() => {
        const fetchWeather = async () => {
            const state = states[currentStateIndex];
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${state},IN&appid=${apiKey}&units=metric`
                );
                setWeatherData({
                    name: response.data.name,
                    temp: response.data.main.temp,
                });
            } catch (error) {
                console.error("Error fetching the weather data:", error);
            }
        };

        fetchWeather();
        const intervalId = setInterval(() => {
            setCurrentStateIndex((prevIndex) => (prevIndex + 1) % states.length);
        }, 10000); // Change state every 10 seconds

        return () => clearInterval(intervalId);
    }, [currentStateIndex, apiKey]);


    useEffect(() => {
        const fetchNavOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/categories/');
                setNavOptions(response.data);
            } catch (err) {
                console.error('Error fetching navigation options:', err);
                setError('Failed to load navigation options.');
            }
        };

        fetchNavOptions();
    }, []);

    // const toggleMenu = () => {
    //     setIsMenuOpen(prev => !prev);
    // };

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const performSearch = (e) => {
        e.preventDefault();
        // Implement your search logic here, e.g., redirecting to a search results page
        console.log('Searching for:', searchTerm);
        setSearchTerm('');
        setIsSearchOpen(false);
    };

    return (
        <div className="relative"> {/* Added z-index */}
            <div className="flex items-center justify-between p-2 border-b">
                <div className="hidden md:flex items-center space-x-1 md-hidden">
                    <span className="text-sm text-gray-700">{date} | </span>
                    {/* <IoLocationSharp className="text-black" />
                    <span className="text-sm text-gray-700">{weatherData.name}</span>
                    <LuCloudSunRain className="text-yellow-500" />
                    <span className="text-sm text-gray-700 ">{weatherData.temp} °C</span> */}
                </div>
                {/* <span className="hidden md:block text-xs md:text-sm lg:text-base">{date} | </span> Ensure this is visible across all screen sizes */}
                
                <span className="text-lg md:text-xl lg:text-3xl font-bold">
                    <Link to="/">{WebsiteName.toUpperCase()}</Link>
                </span>
                
                <div className="flex items-center gap-4"> {/* Ensure all elements are aligned in a straight line */}
                    <button onClick={toggleSearch} className="relative">
                        <span className="text-2xl"><IoMdSearch /></span>
                    </button>

                    {!isLoggedIn ? (
                        <Link to="/login" className="text-xs md:text-sm lg:text-base">SIGN IN</Link>
                    ) : (
                        <Link to="/dashboard" className="text-xs md:text-sm lg:text-base">Dashboard</Link>
                    )}
                </div>
            </div>

            {/* Centered Desktop Navigation */}
            <div className="">
                <nav className="p-2 shadow-lg">
                    <div className="container mx-auto flex justify-center items-center"> {/* Center navigation */}
                        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-visible whitespace-nowrap"> {/* Horizontal scrolling with visible scrollbar */}
                            <Link to="/" className="hover:text-gray-500">Home</Link>
                            {error ? (
                                <span className="text-red-500">{error}</span>
                            ) : (
                                navOptions.map((nav, index) => (
                                    <Link key={index} to={`/${nav.category.toLowerCase()}`} className="hover:text-gray-500">
                                        {nav.category}
                                    </Link>
                                ))
                            )}
                            <Link to="/dashborad">Dashboard</Link>
                            <Link to="/dashborad">Dashboard</Link>
                            <Link to="/dashborad">Dashboard</Link>
                            <Link to="/dashboard">Dashboard 5</Link>
                            <Link to="/dashboad">Dashboard</Link>
                            <Link to="/dashboad">Dashboard</Link>
                            <Link to="/dashboad">Dashboard</Link>
                            <Link to="/dashboad">Dashboard</Link>
                            <Link to="/dashboad">Dashboard</Link>
                        </div>
                    </div>
                </nav>

                {isSearchOpen && (
                    <form onSubmit={performSearch} className="absolute top-16 right-0 bg-white shadow-md p-4 z-20">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="border border-gray-300 rounded p-2"
                        />
                        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                            Search
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Header;
