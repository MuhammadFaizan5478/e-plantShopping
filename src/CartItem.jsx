// src/components/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (name, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    dispatch(updateQuantity({ name, quantity: newQuantity }));
  };

  const handleRemoveItem = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.cost.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="item-total">${(item.cost * item.quantity).toFixed(2)}</p>
        <button 
          className="delete-btn"
          onClick={() => handleRemoveItem(item.name)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;