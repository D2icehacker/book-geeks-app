import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarked: JSON.parse(localStorage.getItem('bookmarked')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  reviews: JSON.parse(localStorage.getItem('reviews')) || {},
  ratings: JSON.parse(localStorage.getItem('ratings')) || {},
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarked.push(action.payload);
      localStorage.setItem('bookmarked', JSON.stringify(state.bookmarked));
    },
    removeBookmark: (state, action) => {
      state.bookmarked = state.bookmarked.filter(book => book.id !== action.payload.id);
      localStorage.setItem('bookmarked', JSON.stringify(state.bookmarked));
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(book => book.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    addReview: (state, action) => {
      const { id, review } = action.payload;
      if (!state.reviews[id]) {
        state.reviews[id] = [];
      }
      state.reviews[id].push(review);
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    addRating: (state, action) => {
      const { id, rating } = action.payload;
      state.ratings[id] = rating;
      localStorage.setItem('ratings', JSON.stringify(state.ratings));
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
export const selectRatings = (state) => state.books.ratings;
export const selectReviewsByBookId = (state, bookId) => state.books.reviews[bookId] || [];

export default bookSlice.reducer;