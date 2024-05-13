const Book = require('../models/book');

const bookController = {
    // Controller function to create a new book
    createBook: async (req, res) => {
        try {
            const newBook = await Book.create(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controller function to get all books
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            res.json(allBooks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controller function to get a single book by ID
    getBookById: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controller function to update a book by ID
    updateBook: async (req, res) => {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(updatedBook);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Controller function to delete a book by ID
    deleteBook: async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = bookController;
