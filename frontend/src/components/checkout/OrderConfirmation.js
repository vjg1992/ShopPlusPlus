import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8001/api/orders/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setOrderDetails(data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return tomorrow.toLocaleDateString(undefined, options);
    };

    if (!orderDetails) return <div>Loading...</div>;

    return (
        <div className="order-confirmation-container">
            <h2>Order Confirmation</h2>
            {orderDetails.items.map(item => (
                <div key={item._id} className="order-details">
                    <h3>Order #{orderDetails._id}</h3>
                    <p>{item.quantity} x {item.productId?.ProductName || 'Product Name Missing'} - {item.productId?.weight || 'Weight Missing'}</p>
                    <p>Delivery Date: {orderDetails.deliveryDate || getTomorrowDate()}</p>
                </div>
            ))}
            <p>Total Price: Rs. {orderDetails.totalPrice}</p>
        </div>
    );
};

export default OrderConfirmation;
