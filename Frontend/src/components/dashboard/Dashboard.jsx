import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard
() {
    const [stats, setStats] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/blog/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Error Fetching dashboard data:', err);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="">
            <h1>Blog Dashboard</h1>
            <div className="">
                <div className="">
                    <h2>Total Blogs</h2>
                    {/* Conditionally render totalBlogs */}
                    <p>{stats ? stats.totalBlogs : 'Loading...'}</p>
                </div>

                <div className="">
                    <h2>Blog Views per Month</h2>
                    <ul>
                        {/* Conditionally render blogViewsPerMonth */}
                        {stats && stats.blogViewsPerMonth.map((monthData) => (
                            <li key={monthData._id.month}>
                                Month: {monthData._id.month}, Views: {monthData.totalViews}, Blogs: {monthData.totalBlogs}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
