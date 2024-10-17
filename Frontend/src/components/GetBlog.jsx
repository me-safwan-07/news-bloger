import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";

function GetBlog() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [first, setFirst] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blog/get');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setBlogs(data);
                setFirst(data.slice(0, 5));
                console.log(data);
            } catch (err) {
                console.error('Error fetching content:', err);
                setError('Failed to fetch blogs. Please try again later.');
            }
        };

        fetchBlogs();
    }, []);    

    const truncateContent = (content, limit = 100) => {
        const text = content.replace(/<[^>]*>/g, '');
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="mx-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {first.length > 0 ? (
                <div className='md:flex'>
                    {/* First blog post with larger layout */}
                    <div className="flex flex-col md:flex-row items-start mb-4 border rounded-lg overflow-hidden shadow-md w-full md:w-1/3">
                        <Link to={`/blog/${first[0]._id}`} className="w-full relative">
                            <img className="w-full h-52 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" src={first[0].image} alt={first[0].title} />
                            <div className="p-4 flex flex-col">
                                <h3 className="text-xl lg:text-2xl font-semibold">{first[0].title}</h3>
                                <p className="text-gray-700 text-lg">{truncateContent(first[0].content, 150)}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-sm flex items-center gap-2">
                                        <LuTimer className='h-4 w-4' />
                                        {formatDate(first[0].createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Grid for subsequent blog posts */}
                    <div className="grid grid-cols-2 w-full md:w-2/3 border">
                        {first.slice(1).map((blog) => (
                            <div key={blog._id} className="border h-max rounded-lg overflow-hidden ">
                                <Link to={`/blog/${blog._id}`} className='flex gap-2 border'>
                                    
                                    <div className="p-2">
                                        <h3 className="text-sm font-semibold">{blog.title}</h3>
                                        {/* <p className="text-gray-600 text-xs">{truncateContent(blog.content, 50)}</p>
                                        <div className="flex items-center mt-1 text-gray-500 text-xs">
                                            <LuTimer className='h-4 w-4' />
                                            <span className="ml-1">{formatDate(blog.createdAt)}</span>
                                        </div> */}
                                    </div>
                                    <img src={blog.image} alt={blog.title} className='w-1/3 h-auto object-cover' />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>No blog posts found.</div>
            )}
            <hr />
        </div>
    );
}

export default GetBlog;
