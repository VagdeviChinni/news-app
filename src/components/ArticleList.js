// ArticleList.js
import React, { useState } from 'react';
import DetailedArticleView from './DetailedArticleView';

const ArticleList = ({ articles, searchTerm }) => {
  const defaultImage = 'https://picsum.photos/300/200'; // Default placeholder image
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  const renderArticles = () => {
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredArticles.length === 0) {
      return <p>No articles found.</p>;
    }

    return filteredArticles.map((article, index) => (
      <div key={index} className="article-card">
        <div className="article-card-inner" onClick={() => handleArticleClick(article)}>
          <div className="article-card-front">
            <img src={article.urlToImage || defaultImage} alt={article.title} className="article-image" />
            <div className="article-info">
              <h2>{article.title}</h2>
            </div>
          </div>
          <div className="article-card-back">
            <p>{article.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="article-list">
      {selectedArticle && (
        <DetailedArticleView article={selectedArticle} onClose={handleBackClick} />
      )}
      {!selectedArticle && renderArticles()}
    </div>
  );
};

export default ArticleList;
