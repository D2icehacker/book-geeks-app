// bookSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarked: [],
  favorites: [],
  reviews: JSON.parse(localStorage.getItem("reviews")) || [],
  ratings: JSON.parse(localStorage.getItem("ratings")) || {}, // Load ratings from local storage
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarked.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarked = state.bookmarked.filter(
        (book) => book.id !== action.payload.id
      );
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload.id
      );
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
    addRating: (state, action) => {
      const { id, rating } = action.payload;
      state.ratings[id] = rating;
      localStorage.setItem("ratings", JSON.stringify(state.ratings));
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  addFavorite,
  removeFavorite,
  addReview,
  addRating,
} = bookSlice.actions;

export const selectBookmarked = (state) => state.books.bookmarked;
export const selectFavorites = (state) => state.books.favorites;
export const selectReviews = (state) => state.books.reviews;
export const selectRatings = (state) => state.books.ratings; // Select ratings from the state

export default bookSlice.reducer;
