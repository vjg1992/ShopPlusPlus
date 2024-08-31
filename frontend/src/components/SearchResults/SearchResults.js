import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
        const response = await fetch(`${API_BASE_URL}/api/products/search?query=${query}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map(product => (
            <div key={product._id} className="product-item">
              <img src={product.Images[0]} alt={product.ProductName} />
              <h3>{product.ProductName}</h3>
              <p>Price: Rs. {product.Price}</p>
              <p>{product.Description}</p>
              <a href={`/product/${product._id}`}>View Details</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
