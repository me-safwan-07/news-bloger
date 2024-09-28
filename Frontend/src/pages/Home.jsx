import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import BlogCard from '../components/BlogCard';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blog/get');
                const data = await res.json();

                // sort the blog by last updated date in descenting order
                // const sortedBlogs = data.sort((a,b) => new Date(a.updatedAt) - new Date(a.updatedAt));
                setBlogs(data);
            } catch (err) {
                console.error('Error fetching content:', err);
            }
        };

        fetchBlog();
    }, []);

  return (
    <div>
        {blogs.map((blog) => (
            <div key={blog._id}>
                <h2>
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </h2>
            </div>
        ))}
    </div>
  )
};

export default BlogPosts;
