// DetailedArticleView.js
import React from 'react';

const DetailedArticleView = ({ article, onClose }) => {
  const defaultImage = 'https://picsum.photos/300/200'; // Default placeholder image

  return (
    <div className="detailed-article">
      <button className="back-button" onClick={onClose}>Back</button>
      <h2>{article.title}</h2>
      <img src={article.urlToImage || defaultImage} alt={article.title} />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default DetailedArticleView;
