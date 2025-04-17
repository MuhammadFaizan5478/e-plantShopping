// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ currentPage }) => {
  const cartItems = useSelector((state) => state.cart.items);
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Paradise Nursery</h1>
        <nav className="nav">
          {currentPage !== 'landing' && (
            <Link to="/" className="nav-link">Home</Link>
          )}
          {currentPage !== 'products' && (
            <Link to="/products" className="nav-link">Shop Plants</Link>
          )}
          {currentPage !== 'cart' && (
            <Link to="/cart" className="cart-icon">
              <span className="material-icons">shopping_cart</span>
              <span className="cart-count">{getTotalItems()}</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;