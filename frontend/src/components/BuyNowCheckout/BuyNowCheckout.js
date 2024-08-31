import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BuyNowCheckout.css';

const BuyNowCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [checkoutData, setCheckoutData] = useState(location.state);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location.pathname, ...location.state } });
        }
    }, [navigate, location.pathname, location.state]);

    useEffect(() => {
        if (!checkoutData || !checkoutData.product) {
            navigate('/', { replace: true });
        }
    }, [checkoutData, navigate]);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            setCheckoutData({
                ...checkoutData,
                quantity: newQuantity,
            });
        }
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location.pathname, ...location.state } });
            return;
        }

        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
            const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: [
                        {
                            productId: checkoutData.product.ProductID,
                            quantity: checkoutData.quantity,
                            productModel: checkoutData.product.category,
                        }
                    ],
                    totalPrice: checkoutData.product.Price * checkoutData.quantity,
                    paymentMethod: "Credit Card",
                    fromCart: false
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Order placed successfully!');
                navigate('/order-confirmation', { state: { orderId: data._id} });
            } else if (response.status === 401) {
                alert('You are not authorized. Please log in again.');
                navigate('/login', { state: { from: location.pathname, ...location.state } });
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (!checkoutData || !checkoutData.product) return <div>Loading...</div>;

    return (
        <div className="buy-now-checkout-container">
            <h2>Checkout</h2>
            <div className="product-details">
                <img src={checkoutData.product.Images?.[0] || 'default-image.jpg'} alt={checkoutData.product.ProductName || 'Product'} />
                <div className="product-info">
                    <h3>{checkoutData.product.ProductName}</h3>
                    <p>Price: Rs. {checkoutData.product.Price}</p>
                    <div className="quantity-container">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            value={checkoutData.quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <p>Total: Rs. {checkoutData.product.Price * checkoutData.quantity}</p>
                </div>
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
                Place Order
            </button>
        </div>
    );
};

export default BuyNowCheckout;