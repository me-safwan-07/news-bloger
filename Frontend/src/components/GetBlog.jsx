import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";

function GetBlog() {
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

    // Function to truncate content
    const truncateContent = (content, limit = 100) => {
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Format to dd/mm/yyyy
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div className="flex flex-col md:flex-row items-start mb-4 border rounded-lg overflow-hidden shadow-md" key={blog._id}>
                        <Link to={`/blog/${blog._id}`} className="flex w-full flex-col md:flex-row">
                            {/* Image on top for mobile, to the side for larger screens */}
                            <img className="w-full md:w-1/3 h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" src={blog.image} alt={blog.title} />
                            <div className="flex-1 p-4">
                                {/* Blog Title */}
                                <h3 className="text-xl md:text-2xl font-semibold">{blog.title}</h3>
                                <p className="text-gray-700 text-sm md:text-base">{truncateContent(blog.content)}</p>
                                <div className="flex justify-between items-center mt-2">
                                    {/* Date and Category */}
                                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-2">
                                        <LuTimer className='h-4 w-4' />
                                        {formatDate(blog.createdAt)}
                                    </p>
                                    {blog.category && 
                                        <span className="inline-block bg-red-500 text-white text-xs font-bold uppercase rounded-full px-2 py-1">
                                            {blog.category}
                                        </span>
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div>No blog posts found.</div>
            )}
        </div>
    );
}

export default GetBlog;
