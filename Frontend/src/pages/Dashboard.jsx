import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Bell, ChevronDown, Layout, Users, Pencil, Trash2 } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext';
import {DashboardMonthData} from '../components/dashboard/DashboardMonthData';

function Dashboard() {
    const { stats } = useContext(DashboardContext);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/blog/get');
                setBlogs(res.data);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to fetch blogs. Please try again later.');
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/blog/delete/${id}`);
            if (res.status === 204) {
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            }
        } catch (err) {
            console.error('Error deleting blog:', err);
        }
    };

    const handleUpdate = (id) => {
        alert("Editing functionality would be implemented here.");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h2 className="text-lg font-bold">Dashboard Menu</h2>
                    <nav className="mt-4">
                        <ul>
                            <li className="py-2"><a href="/dashboard/categorys" className="text-gray-700">Category</a></li>
                            <li className="py-2"><a href="#" className="text-gray-700">Analytics</a></li>
                            <li className="py-2"><a href="#" className="text-gray-700">Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900">Dashboard</h2>
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 text-gray-700 mr-4" />
                            <div className="relative">
                                <button className="flex items-center">
                                    <span className="mr-2">Admin</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="max-w-7xl mx-auto py-6 px-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Views Card */}
                        <div className="bg-white shadow-md rounded p-4">
                            <h3 className="text-sm font-medium">Total Views</h3>
                            {stats && stats.blogViewsPerMonth.map((monthData) => (
                                <div key={monthData._id.month}>
                                    Views: {monthData.totalViews}
                                </div>
                            ))}
                        </div>

                        {/* Avg. Time on Page Card */}
                        <div className="bg-white shadow-md rounded p-4">
                            <h3 className="text-sm font-medium">Avg. Time on Page</h3>
                            <div className="text-2xl font-bold">3m 42s</div>
                            <p className="text-xs text-gray-500">+2.4% from last month</p>
                        </div>

                        {/* Bounce Rate Card */}
                        <div className="bg-white shadow-md rounded p-4">
                            <h3 className="text-sm font-medium">Total News</h3>
                            <div className="text-2xl font-bold"><DashboardMonthData /></div>
                        </div>
                    </div>

                    {/* Blog Titles Table */}
                    <div className="bg-white shadow-md rounded mt-8 p-4">
                        <h3 className="text-lg font-bold">Blog Titles</h3>
                        <p className="text-sm text-gray-500">Manage your blog posts</p>
                        <table className="min-w-full mt-4">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, index) => (
                                    <tr key={blog._id} className="bg-gradient-to-r from-blue-500 to-purple-500">
                                        <td className="border px-4 py-2 text-sm text-gray-900 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2 whitespace-normal break-words">{blog.title}</td>
                                        <td className="border px-4 py-2">{new Date(blog.createdAt).toLocaleDateString('en-GB')}</td>
                                        <td className="border px-4 py-2">
                                            <button className="mr-2 border p-1 rounded" onClick={() => handleUpdate(blog._id)}>
                                                <Pencil className="h-4 w-4 mr-1" /> Edit
                                            </button>
                                            <button className="border p-1 rounded" onClick={() => handleDeleteBlog(blog._id)}>
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
