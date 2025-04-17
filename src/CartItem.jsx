import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  if (!item) return null;

  const { name, image, cost, quantity } = item;

  const handleIncrement = () => {
    dispatch(updateQuantity({
      name,
      quantity: quantity + 1
    }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({
        name,
        quantity: quantity - 1
      }));
    } else {
      dispatch(removeItem(name));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(name));
  };

  const calculateItemSubtotal = () => {
    const priceValue = typeof cost === 'string' && cost.startsWith('$') 
      ? parseFloat(cost.substring(1)) 
      : parseFloat(cost);
      
    return (priceValue * quantity).toFixed(2);
  };

  

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image || '/placeholder.jpg'} alt={name} />
      </div>
      <div className="cart-item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">
          ${typeof cost === 'string' && cost.startsWith('$') 
            ? cost.substring(1) 
            : cost}
        </p>
      </div>
      <div className="cart-item-quantity">
        <button className="quantity-btn decrement" onClick={handleDecrement}>-</button>
        <span className="quantity">{quantity}</span>
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
