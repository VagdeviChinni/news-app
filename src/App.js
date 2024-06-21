import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ArticleList from './components/ArticleList';
import CategoryFilter from './components/CategoryFilter';
import Pagination from './components/Pagination';
import './App.css';

const API_KEY = '26b58af1f2ea427798b8f653a0cb012c'; // Your API key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          category: category,
          page: currentPage,
          pageSize: 9, // Adjust this value if needed
          country: 'us',
        },
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error fetching the articles', error);
    }
  }, [category, currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1 className="typewriter">News for everyone</h1>
        <div className="filters-and-search">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </header>
      <ArticleList articles={articles} searchTerm={searchTerm} />
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        pageSize={9} // Ensure this matches the pageSize in the request
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
