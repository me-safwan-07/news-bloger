import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuTimer } from "react-icons/lu";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

// components
import FakeAd from '../components/FakeAd';
import {HeroSection} from '../components/home/HeroSection';
import { HorizontialNews } from '../components/home/HorizontialNews';
const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [mainNews, setMainNews] = useState([]);
    const [sliceblog, setSliceblog] = useState([]);
    const [category, setCategory] = useState([]);
    const [titleSize, setTitleSize] = useState(55);

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
                const res = await fetch('/api/blog/get');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setBlogs(data);
                setMainNews(data.slice(0, 7));
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
            <div className="w-full md:w-3/4 md:mx-auto md:p-4">
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {/* Hero Section */}
                <HeroSection mainNews={mainNews} truncateContent={truncateContent} formatDate={formatDate} />
                <hr />
                <HorizontialNews mainNews={mainNews} truncateContent={truncateContent} formatDate={formatDate}/>

                {/* <div>
                    {category.map((cat) => {
                        const filteredBlogs = sliceblog.filter(blog => blog.category.toLowerCase() === cat.toLowerCase());

                        if (filteredBlogs.length > 0) {
                            return (
                                <div key={cat}>
                                    <h2 className='text-xl md:text-2xl'>{cat.toUpperCase()}</h2>

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

                        return null;
                    })}
                </div> */}
            </div>
            
            <div className="w-full md:w-1/4 borde">
                <aside className='w-full h-full'>
                    <FakeAd className={"flex w-full h-64 bg-black-100"} />
                </aside>
            </div>
        </div>

    );
};

export default Home;
