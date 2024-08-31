import React, { useState, useEffect } from 'react';
import { updateCartQuantity, removeCartItem } from './cartService';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: location.pathname, ...location.state } });
    } else {
      fetchCartItems();
    }
  }, [navigate, location.pathname, location.state]);

  const fetchCartItems = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.items);
        calculateTotal(data.items);
        updateCartCount(data.items.length);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Failed to fetch cart items', error);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * (item.productId?.Price || 0), 0);
    setTotal(totalPrice);
  };

  const handleQuantityChange = async (productId, quantity, productModel) => {
    try {
      const response = await updateCartQuantity(productId, quantity, productModel);
      const updatedItems = cartItems.map(item =>
        item.productId.ProductID === productId ? { ...item, quantity: Number(quantity) } : item
      );
      setCartItems(updatedItems);  
      calculateTotal(updatedItems);  
      if (updateCartCount) {
        updateCartCount(response.itemCount); 
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId, productModel) => {
    try {
      const response = await removeCartItem(productId, productModel);
      const updatedItems = cartItems.filter(item => item.productId.ProductID !== productId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
      if (updateCartCount) {
        updateCartCount(response.itemCount); 
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleAddToWishlist = async (productId, productModel) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login', { state: { from: location.pathname, ...location.state } });
      return;
    }
  
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch(`${API_BASE_URL}/api/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          productModel: productModel 
        })
      });
  
      if (response.ok) {
        alert('Product added to wishlist successfully!');
        await handleRemoveItem(productId, productModel);
      } else {
        alert('Failed to add product to wishlist.');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <img src={item.productId?.Images?.[0] || 'default-image.jpg'} alt={item.productId?.ProductName || 'Product'} />
            <div className="cart-item-info">
              <h3>{item.productId?.ProductName || 'Unnamed Product'}</h3>
              <p>Price: Rs. {item.productId?.Price || 'N/A'}</p>
              <div className="quantity-selector">
                <label>Qty: </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId.ProductID, e.target.value, item.productModel)}
                  min="1"
                />
              </div>
              <button onClick={() => handleRemoveItem(item.productId.ProductID, item.productModel)} className="remove-btn">
                Remove
              </button>
              <button onClick={() => handleAddToWishlist(item.productId.ProductID, item.productModel)} className="wishlist-btn">
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: Rs. {total}</h3>
        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
