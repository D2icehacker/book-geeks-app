const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: Number,
    review: String,
    pagesRead: Number,
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
