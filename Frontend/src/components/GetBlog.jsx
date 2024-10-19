import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import FakeAd from './FakeAd';

function GetBlog() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [first, setFirst] = useState([]);
    const [sliceblog, setSliceblog] = useState([]);
    const [category, setCategory] = useState([]);
    const [titleSize, setTitleSize] = useState(150);

    useEffect(() => {
        const handleResize = () => {
            setTitleSize(window.innerWidth <= 425 ? 75 : 150);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                // const allIds = data.map(blog => blog._id);
                setSliceblog(data.slice(5));
                const uniqueCategories = Array.from(new Set(data.map(blog => blog.category.toLowerCase())));
                setCategory(uniqueCategories);
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
        <div className="flex flex-wrap">
        <div className="mx-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {first.length > 0 ? (
                <div className='md:flex'>
                    {/* First blog post with larger layout */}
                    <div className="flex flex-col md:flex-row items-start mb-4 border rounded-lg overflow-hidden shadow-md w-full md:w-1/3">
                        <Link to={`/blog/${first[0]._id}`} className="w-full relative">
                            <img className="relative aspect-video transition-transform duration-300 ease-in-out transform hover:scale-105" src={first[0].image} alt={first[0].title} />
                            <div className="p-4 flex flex-col">
                                <h3 className="text-lg lg:text-xl font-semibold">{first[0].title}</h3>
                                {first[0].title.length < 100 && (
                                    <p className="text-gray-700 text-lg">{truncateContent(first[0].content, 100)}</p>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-xs flex items-center gap-2">
                                        <LuTimer className='h-3 w-3' />
                                        {formatDate(first[0].createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <FakeAd className={"w-5 h-5"} /> */}
                    {/* Grid for subsequent blog posts */}
                    <div className="flex flex-col w-full md:w-2/3 md:ml-2 p-0">
                        {first.slice(1).map((blog) => (
                            <div key={blog._id} className="h-max rounded-lg overflow-hidden border mb-1">
                                <Link to={`/blog/${blog._id}`} className='flex gap-2 m-2 md-2 '>
                                    <div className="flex-grow">
                                        <h3 className="text-xs md:text-sm font-semibold mb-2">{truncateContent(blog.title, titleSize)}</h3>
                                        <p className="hidden md:block text-gray-600 text-xs text-muted-foreground mb-2 ">{truncateContent(blog.content, 50)}</p>
                                        <div className="flex justify-between items-center ">
                                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                                <LuTimer className='h-3 w-3' />
                                                {formatDate(blog.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <img 
                                        src={blog.image} alt={blog.title} 
                                        className='relative sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105' />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>No blog posts found.</div>
            )}
            <hr />

            <div className="">
                {category.map((cat) => {
                    // Filter the blogs for the current category
                    const filteredBlogs = sliceblog.filter(blog => blog.category.toLowerCase() === cat.toLowerCase());

                    // Only render the category if there are more than one blog posts
                    if (filteredBlogs.length > 0) {
                        return (
                            <div key={cat}>
                                <h2 className='text-xl md:text-2xl'>{cat.toUpperCase()}</h2>

                                {/* Display filtered blog posts for the current category */}
                                {filteredBlogs.map((post) => (
                                    <div key={post._id} className="h-max rounded-lg overflow-hidden border mb-1">
                                        <Link to={`/blog/${post._id}`} className='flex gap-2 m-2 md-2 '>
                                            <div className="flex-grow">
                                                <h3 className="text-xs md:text-sm font-semibold mb-2">{truncateContent(post.title, titleSize)}</h3>
                                                <p className="hidden md:block text-gray-600 text-xs text-muted-foreground mb-2 ">{truncateContent(post.content, 50)}</p>
                                                <div className="flex justify-between items-center ">
                                                    <p className="text-gray-500 text-xs flex items-center gap-1">
                                                        <LuTimer className='h-3 w-3' />
                                                        {formatDate(post.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <img 
                                                src={post.image} alt={post.title} 
                                                className='relative sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105' />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    // Return null if the category doesn't meet the criteria
                    return null;
                })}
                
            </div>
        </div>
        <aside>
                    <FakeAd className={"ml-2 md:w-full md:h-auto"} />
                </aside>
        </div>
    );
}

export default GetBlog;
