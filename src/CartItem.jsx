import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

const CartItem = ({ item, onContinueShopping }) => {
  const dispatch = useDispatch();

  // Handle incrementing quantity
  const handleIncrement = () => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Handle decrementing quantity
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      // If quantity would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  // Handle removing item
  const handleRemove = () => {
    dispatch(removeItem(item.name));
  };

  // Calculate the subtotal for this item
  const calculateItemSubtotal = () => {
    // Ensure cost is treated as a number
    const costValue = typeof item.cost === 'string' && item.cost.startsWith('$') 
      ? parseFloat(item.cost.substring(1)) 
      : parseFloat(item.cost);
    
    return (costValue * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">
          ${typeof item.cost === 'string' && item.cost.startsWith('$') 
            ? item.cost.substring(1) 
            : item.cost}
        </p>
      </div>
      <div className="cart-item-quantity">
        <button className="quantity-btn decrement" onClick={handleDecrement}>-</button>
        <span className="quantity">{item.quantity}</span>
        <button className="quantity-btn increment" onClick={handleIncrement}>+</button>
      </div>
      <div className="cart-item-subtotal">
        <p>${calculateItemSubtotal()}</p>
      </div>
      <div className="cart-item-actions">
        <button className="remove-btn" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;