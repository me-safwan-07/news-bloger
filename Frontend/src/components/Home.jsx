// src/components/Home.js
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Sample static data; you can replace this with an API call to fetch news.
    const sampleNews = [
      { id: 1, title: 'Breaking News 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { id: 2, title: 'Breaking News 2', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      // Add more news data here
    ];
    setNewsData(sampleNews);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {newsData.map((news) => (
          <div key={news.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{news.title}</h2>
            <p>{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
