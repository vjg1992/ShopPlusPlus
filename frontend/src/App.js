
import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/login/Register';
import Home from './components/home/home';
import AccountInfo from './components/accountinfo/AccountInfo';
import Category from './components/category/Category';
import Navbar from './components/navbar/Navbar';
import ProductDetails from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Wishlist from './components/wishlist/wishlist';  
import OrderConfirmation from './components/checkout/OrderConfirmation';  
import BuyNowCheckout from './components/BuyNowCheckout/BuyNowCheckout';
import SearchResults from './components/SearchResults/SearchResults'; 
import OrderHistory from './components/orderHistory/OrderHistory';
import OrderDetails from './components/orderDetails/OrderDetails';
import MyReviews from './components/MyReviews/MyReviews';

function App() {
  const [userName, setUserName] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8001/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.name) {
            setUserName(data.name);
          } else {
            console.error('User name not found in the response');
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  const updateCartCount = (count) => {
    setCartItemCount(count);
  };

  return (
    <div className="App">
      <Navbar userName={userName} cartItemCount={cartItemCount} updateCartCount={updateCartCount}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login updateCartCount={updateCartCount} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<AccountInfo />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/product/:id" element={<ProductDetails updateCartCount={updateCartCount}/>} />
        <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
        <Route path="/checkout" element={<Checkout />} />  
        <Route path="/order-confirmation" element={<OrderConfirmation />} /> 
        <Route path="/wishlist" element={<Wishlist />} /> 
        <Route path="/buy-now-checkout" element={<BuyNowCheckout />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </div>
  );
}

export default App;
