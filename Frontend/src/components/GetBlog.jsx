import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            {error && <div>{error}</div>}
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog._id}>
                        <h2>
                            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                        </h2>
                    </div>
                ))
            ) : (
                <div>No blog posts found.</div>
            )}
        </div>
    );
}

export default GetBlog