// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../Redux/Reducers/bookSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
