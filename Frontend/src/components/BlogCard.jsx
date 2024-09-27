import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <div className="">
        <Link to={`/{blog.id}`}>
            <h2>{blog.title}</h2>
            {/* <div className='content' dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
            {/* <p><strong>Category:</strong> {blog.category}</p> */}
            <p><strong></strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
        </Link>
    </div>
  )
}

export default BlogCard