const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: Number,
    reviews: [reviewSchema], 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
