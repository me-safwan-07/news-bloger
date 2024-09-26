import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <div className="">
        <Link to={`/blogs/${blog.slug}`}>
            <p>{blog.title}</p>
        </Link>
    </div>
  )
}

export default BlogCard