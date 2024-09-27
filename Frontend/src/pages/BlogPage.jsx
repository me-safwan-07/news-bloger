import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/blog/get');
                const data = await res.json();
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
                <h2>{blog.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
        ))}
    </div>
  )
}

export default BlogPage