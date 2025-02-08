import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Shop By Category</h3>
          <Link to="/category/DogProduct">Dog Products</Link>
          <Link to="/category/CatProduct">Cat Products</Link>
          <Link to="/category/FishProduct">Fish Products</Link>
          <Link to="/category/PetSupply">Pet Supplies</Link>
          <Link to="/category/PetHealth">Pet Health</Link>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <Link to="/about">Our Story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        <div className="footer-section social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopPlusPlus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;