const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: Number,
    review: {
        type: String,
        default: '' // Default value to prevent the field from being empty
    },
    pagesRead: Number,
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
