import React from 'react'

const HorizontialNews = ({mainNews}) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full md:w-2/3 md:ml-2 px-2">
        {mainNews.slice(1, 7).map((blog, index) => (
            <div
                key={blog._id}
                className={`flex flex-row-reverse md:flex-col relative ${index >= 2 ? 'md:justify-between' : ''}`}
            >
            <Link to={`/blog/${blog._id}`} className="gap-2 mx-2">
                {/* Mobile: Show image for all indexes on the right */}
                <div className="flex flex-row-reverse flex-grow md:flex-col pl-2 w-full">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className={`block md:hidden sm:w-32 aspect-video h-10 md:w-1/5 md:h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                        index < 2 ? 'md:hidden' : ''
                        }`}
                    />
                    <div className='flex-grow'>
                        <h3 className="text-xs md:text-sm font-semibold mb-2">
                            {truncateContent(blog.title, titleSize)}
                        </h3>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                <LuTimer className="h-3 w-3" />
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            {/* Show the vertical line starting from the second box */}
            {index > 0 && (
                <div
                className="absolute left-0 top-0 h-full border-l-2 border-gray-300 transform -translate-y-1/2"
                style={{ top: '50%' }}
                />
            )}
            </div>
        ))}
    </div>
  )
}

export default HorizontialNews