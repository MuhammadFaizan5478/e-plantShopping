import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add item to cart
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
