import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  return (
    <div className="cart-page">
      <Header currentPage="cart" />
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="continue-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <p className="cart-total-items">Items in cart: {getTotalItems()}</p>
              <p className="cart-total-price">Total: ${getTotalPrice().toFixed(2)}</p>
            </div>
            
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;