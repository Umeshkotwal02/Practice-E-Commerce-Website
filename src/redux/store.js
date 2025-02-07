// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './counter/cartSlice';

export const store = configureStore({
  reducer: {
    counter: cartReducer,
  },
});