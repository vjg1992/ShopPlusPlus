import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:8001/api/orders/history', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                    setOrders(sortedOrders);
                } else {
                    console.error('Failed to fetch order history');
                }
            } catch (error) {
                console.error('Failed to fetch order history', error);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <Link to={`/order/${order._id}`}>
                            Order #{order._id} - Total: Rs. {order.totalPrice} - 
                            Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'Invalid Date'}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
