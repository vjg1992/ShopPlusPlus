import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
                const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="order-details-container">
            <h2>Order Details</h2>
            <p>Order ID: {order._id}</p>
            
            <p>Order Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'Invalid Date'}</p>
            
            <h3>Items:</h3>
            <ul>
                {order.items && order.items.length > 0 ? (
                    order.items.map(item => (
                        <li key={item._id}>
                            <div className="item-details">
                                <img src={item.image || '/default-image.jpg'} alt={item.ProductName} />
                                <div className="item-info">
                                    <p>{item.quantity} x {item.productId?.ProductName}</p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </ul>
            <p>Total Price: Rs. {order.totalPrice}</p>
            <p>Payment Method: {order.paymentMethod}</p>
        </div>
    );
};

export default OrderDetails;
