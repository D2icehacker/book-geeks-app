const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const Book = require('./models/book');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Route to fetch book information from Open Library API
app.get('/api/books/:query', async (req, res) => {
    try {
        // Extract the query parameter from the request URL
        const query = req.params.query;
        console.log('Received request for query:', query);

        // Make a request to the Open Library API to fetch book information
        const response = await axios.get(`http://openlibrary.org/search.json?q=${query}`);

        // Check if the response is a redirect
        if (response.request.res.responseUrl !== response.config.url) {
            // If it's a redirect, follow the redirect URL
            const redirectResponse = await axios.get(response.request.res.responseUrl);
            const books = redirectResponse.data.docs.map(book => ({
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                firstSentence: book.first_sentence ? book.first_sentence[0] : 'No first sentence available',
                coverUrl: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
                subjects: book.subject ? book.subject.join(', ') : 'No subjects available'
            }));
            res.json(books);
        } else {
            // If it's not a redirect, parse the response as usual
            const books = response.data.docs.map(book => ({
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                firstSentence: book.first_sentence ? book.first_sentence[0] : 'No first sentence available',
                coverUrl: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
                subjects: book.subject ? book.subject.join(', ') : 'No subjects available'
            }));
            res.json(books);
        }
    } catch (error) {
        // Handle errors during book data fetching
        console.error('Error fetching book data:', error.message);
        res.status(500).json({ error: 'Error fetching book data' });
    }
});

// Route to create a new book
app.post('/api/books', async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error.message);
        res.status(500).json({ error: 'Error creating book' });
    }
});

// Route to get all books
app.get('/api/books', async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching all books:', error.message);
        res.status(500).json({ error: 'Error fetching all books' });
    }
});

// Route to get a single book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book by ID:', error.message);
        res.status(500).json({ error: 'Error fetching book by ID' });
    }
});

// Route to update a book by ID
app.put('/api/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({ error: 'Error updating book' });
    }
});

// Route to delete a book by ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error.message);
        res.status(500).json({ error: 'Error deleting book' });
    }
});

// Start the server
app.listen(PORT, () => {
    // Notify the client that the server is running and listening on the specified port
    console.log(`Server is running on port ${PORT}`);
});
