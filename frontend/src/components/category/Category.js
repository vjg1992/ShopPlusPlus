import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Category.css';
import { Link } from 'react-router-dom';

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
        const response = await fetch(`${API_BASE_URL}/api/products/category/${name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [name]);

  return (
    <div className="category-container">
      <h2>{name.replace(/([A-Z])/g, ' $1').trim()}</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`}>
              <img src={product.Images[0]} alt={product.ProductName} />
              <h3>{product.ProductName}</h3>
            </Link>
            <p>{product.Description}</p>
            <p><strong>Price:</strong> Rs. {product.Price}</p>
            <p><strong>Rating:</strong> {product.Rating}</p>
            <p><strong>Stock:</strong> {product.StockQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
