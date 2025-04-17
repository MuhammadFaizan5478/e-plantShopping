import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartPage = ({onContinueShopping}) => {
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      let costValue = 0;
      
      if (typeof item.cost === 'string') {
        const stripped = item.cost.replace(/[^0-9.]/g, ''); // remove $ or any symbol
        costValue = parseFloat(stripped);
      } else {
        costValue = parseFloat(item.cost);
      }
  
      if (isNaN(costValue)) costValue = 0;
  
      return total + (costValue * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    if (typeof onContinueShopping === 'function') {
      onContinueShopping(); // Tells App to show ProductList again
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-page">
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
