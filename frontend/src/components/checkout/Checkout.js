import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  useEffect(() => {
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
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * (item.productId?.Price || 0), 0);
    setTotal(totalPrice);
  };

  const handlePlaceOrder = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.productId.ProductID,
            quantity: item.quantity,
            productModel: item.productModel,
            image: item.productId.Images?.[0] || '/default-image.jpg',
          })),
          totalPrice: total,
          paymentMethod: paymentMethod,
          fromCart: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Order placed successfully!');
        
        navigate('/order-confirmation', { state: { orderId: data._id } });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId.ProductID}>
              <span>{item.productId?.ProductName || 'Unnamed Product'}</span>
              <span>Qty: {item.quantity}</span>
              <span>Price: Rs. {item.productId?.Price || 'N/A'}</span>
            </li>
          ))}
        </ul>
        <h3>Total: Rs. {total}</h3>
      </div>
      <div className="payment-method">
        <h3>Select Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      <button onClick={handlePlaceOrder} className="place-order-btn">
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
