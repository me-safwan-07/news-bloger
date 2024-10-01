import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/blog/get/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBlog(data);
        } catch (err) {
            toast.error('Failed to fetch blog');
            console.error('Error:', err.message);
        }
    }
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
        <div className='p-3 max-w-3xl mx-auto'>
            <ToastContainer />
            {/* <Spinner size='xl' /> */}
        </div>
    )
  }
  return (
    <div>
        <h1>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  )
}

export default BlogPage