import React, { useState, useEffect } from 'react';

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        Latest <span className="text-primary">News</span>
      </h2>

      <div className="row">
        {articles && articles.map((article, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card" style={{ width: '100%' }}>
              <img
                src={article.urlToImage || "https://via.placeholder.com/286x180"}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.description || "No description available."}
                </p>
                <p className="text-muted mb-2">
                  <em>{article.author || "Unknown Author"}</em>
                </p>
                <a href={article.url || "#"} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsBoard;
