import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaCartArrowDown } from 'react-icons/fa';

const Navbar = ({ userName, cartItemCount, updateCartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!userName);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!userName);
    const token = localStorage.getItem('token');
    if (token) {
      fetchCartData(token);
    }
  }, [userName]);

  const fetchCartData = async (token) => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        updateCartCount(data.items.length); 
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    updateCartCount(0);
    setSearchQuery('');
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const handleLinkClick = () => {
    setSearchQuery('');
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
        const response = await fetch(`${API_BASE_URL}/api/products/suggestions?query=${query}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?query=${suggestion}`);
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <nav className="navbar">
      <div className="main_div">
        <div className="main_logo_div">
          <div className="logo-div">
            <img className="iframe_logo" src="/ShopPlusPlus.gif" alt='ShopPlusPlus - Logo' />
          </div>
          <div className="categories-div">
            <div className="nav-links">
              <Link to="/" onClick={handleLinkClick}>Home</Link>
              <div className='nav-search'>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search ShopPlusPlus" 
                  value={searchQuery} 
                  onChange={handleSearchChange} 
                />
                <button className="search-button" onClick={handleSearchSubmit}>
                  <FaSearch />
                </button>
                {suggestions.length > 0 && (
                  <ul className="search-suggestions">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {isLoggedIn ? (
                <div
                  className="user-menu"
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <span className="user-greeting">Hey, {userName}</span>
                  {dropdownVisible && (
                    <div className="dropdown-menu">
                      <Link to="/me" onClick={handleLinkClick}>Account Info</Link>
                      <Link to="/wishlist" onClick={handleLinkClick}>Wishlist</Link> 
                      <Link to="/order-history">Order History</Link>
                      <Link to="/my-reviews">My Reviews</Link>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" onClick={handleLinkClick}>Login</Link>
              )}
              <Link to="/cart" className="cart-link">
                <div className='cart'>
                  <div className="cart-text" onClick={handleLinkClick}>Cart</div>
                  <div className="cart-icon">
                    <FaCartArrowDown size={24} />
                    <span className="cart-count">{cartItemCount}</span> 
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="side_logo">
          <img
            className="main_logo"
            src="/ShopPlusPlusLogo.webp"
            alt="Shop Smart, Shop Better"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
