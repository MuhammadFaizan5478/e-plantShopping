import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  // Calculate total number of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Paradise Nursery</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li>
              <Link to="/cart" className="cart-icon">
                <i className="fa fa-shopping-cart"></i>
                <span className="cart-count">{getTotalItems()}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;