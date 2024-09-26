import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/blog/get');
                setBlogs(response.data);
            } catch (error) {
                setError('Error fetching blogs');
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog._id} className="blog-post">
                    <h2>{blog.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    {/* <p><strong>Category:</strong> {blog.category}</p> */}
                    <p><strong></strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogPosts;
