import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarked: [],
  favorites: [],
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarked.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarked = state.bookmarked.filter(book => book.id !== action.payload.id);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(book => book.id !== action.payload.id);
    },
  },
});

export const { addBookmark, removeBookmark, addFavorite, removeFavorite } = bookSlice.actions;

export const selectBookmarked = (state) => state.books.bookmarked;
export const selectFavorites = (state) => state.books.favorites;

export default bookSlice.reducer;
