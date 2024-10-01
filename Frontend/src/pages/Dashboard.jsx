import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPage from './BlogPage';
import Home from './Home';
// import { useState } from 'react';
import { Bell, ChevronDown, Layout, Users, Pencil, Trash2 } from 'lucide-react';
function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blog/get');
                const data = await res.json();
                setBlogs(data);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to fetch blogs. Please try again later.');
            }
        };

        fetchBlogs();
    }, []);

  const handleDelete = (id) => {
    setTitles(blogs.filter(blog => blog._id !== id));
    alert("The blog post has been successfully deleted.");
  };

  const handleUpdate = (id) => {
    alert("Editing functionality would be implemented here.");
  };

    return (
        // <Home />
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">News Blog</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900">Dashboard</h2>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Views Card */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-sm font-medium">Total Views</h3>
              <div className="text-2xl font-bold">452,389</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </div>

            {/* Avg. Time on Page Card */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-sm font-medium">Avg. Time on Page</h3>
              <div className="text-2xl font-bold">3m 42s</div>
              <p className="text-xs text-gray-500">+2.4% from last month</p>
            </div>

            {/* Bounce Rate Card */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-sm font-medium">Bounce Rate</h3>
              <div className="text-2xl font-bold">27.5%</div>
              <p className="text-xs text-gray-500">-1.3% from last month</p>
            </div>
          </div>

          {/* Blog Titles Table */}
          <div className="bg-white shadow-md rounded mt-8 p-4">
            <h3 className="text-lg font-bold">Blog Titles</h3>
            <p className="text-sm text-gray-500">Manage your blog posts</p>
            <table className="min-w-full mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="border px-4 py-2">{blog.title}</td>
                    <td className="border px-4 py-2">{blog.date}</td>
                    <td className="border px-4 py-2">
                      <button className="mr-2 border p-1 rounded" onClick={() => handleUpdate(blog._id)}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button className="border p-1 rounded" onClick={() => handleDelete(blog._id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Daily Page Views Chart */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-bold">Daily Page Views</h3>
              <div className="h-48 bg-gray-200 flex items-center justify-center">Line Chart: Daily Page Views</div>
            </div>

            {/* Top Articles Chart */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-bold">Top Articles</h3>
              <div className="h-48 bg-gray-200 flex items-center justify-center">Bar Chart: Top Articles</div>
            </div>

            {/* Traffic Sources Chart */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-bold">Traffic Sources</h3>
              <div className="h-48 bg-gray-200 flex items-center justify-center">Pie Chart: Traffic Sources</div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-bold">Recent Comments</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <img src={`/placeholder.svg?height=40&width=40`} alt="User Avatar" className="rounded-full" />
                    <div>
                      <p className="font-medium">User {i}</p>
                      <p className="text-sm text-gray-500">Great article! I learned a lot from this.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
