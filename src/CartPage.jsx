import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  
  // Calculate total number of items
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Calculate total amount for all items in cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      // Ensure cost is treated as a number
      const costValue = typeof item.cost === 'string' && item.cost.startsWith('$') 
        ? parseFloat(item.cost.substring(1)) 
        : parseFloat(item.cost);
      
      return total + (costValue * item.quantity);
    }, 0).toFixed(2);
  };
  
  // Handle continue shopping button click
  const handleContinueShopping = (e) => {
    navigate('/products');
  };
  
  // Handle checkout button click
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  
  return (
    <div className="cart-page">
      <Header />
      <div className="container">
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
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
                <button 
                  className="continue-shopping-btn"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckoutShopping}
                >
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