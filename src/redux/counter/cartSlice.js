import { createSlice } from '@reduxjs/toolkit';

// Function to get cart state from Local Storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (e) {
    console.error('Could not load cart from Local Storage', e);
    return { items: [] };
  }
};

// Function to save cart state to Local Storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Could not save cart to Local Storage', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state); // Save state to Local Storage
    },
    remove: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      saveToLocalStorage(state); // Save state to Local Storage
    },   
  },
});

export const { add, remove, deleteItem } = cartSlice.actions; // Export deleteItem
export default cartSlice.reducer;
