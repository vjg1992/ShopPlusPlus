import React, { useState, useEffect } from 'react';
import './wishlist.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch('${API_BASE_URL}/api/wishlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      const data = await response.json();
      setWishlist(data.products || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      await fetch('${API_BASE_URL}/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId })
      });
      setWishlist(wishlist.filter(item => item.productId !== productId));
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
    }
  };

  const handleBuyNow = (product) => {
    navigate('/buy-now-checkout', { state: { product: product.productDetails, quantity: 1 } });
    removeFromWishlist(product.productId);
  };

  const handleAddToCart = async (product) => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch('${API_BASE_URL}/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product.productId,
          quantity: 1,
          productModel: product.productModel
        })
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
        removeFromWishlist(product.productId);
        navigate('/cart');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.productId} className="wishlist-item">
              <img src={item.productDetails?.Images[0]} alt={item.productDetails?.ProductName} />
              <h3>{item.productDetails?.ProductName}</h3>
              <p>Price: Rs. {item.productDetails?.Price}</p>
              <div className="wishlist-actions">
                <button onClick={() => handleBuyNow(item)} className="buy-now-btn">Buy Now</button>
                <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">Add to Cart</button>
                <button onClick={() => removeFromWishlist(item.productId)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
