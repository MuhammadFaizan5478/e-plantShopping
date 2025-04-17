import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckoutShopping = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-headers">
                <div className="header-item">Product</div>
                <div className="header-item">Price</div>
                <div className="header-item">Quantity</div>
                <div className="header-item">Subtotal</div>
                <div className="header-item">Actions</div>
              </div>

              {cartItems.map((item, index) => (
                <CartItem 
                  key={index} 
                  item={item}
                  onContinueShopping={handleContinueShopping}
                />
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <p>Total Items: <span>{calculateTotalItems()}</span></p>
                <p>Total Amount: <span>${calculateTotalAmount()}</span></p>
              </div>

              <div className="cart-actions">
                <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
                <button className="checkout-btn" onClick={handleCheckoutShopping}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
