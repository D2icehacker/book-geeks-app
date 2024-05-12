const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// Route to fetch book information from Open Library API
app.get('/api/books/:query', async (req, res) => {
    try {
        const query = req.params.query;
        console.log('Received request for query:', query);
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
        console.error('Error fetching book data:', error.message);
        res.status(500).json({ error: 'Error fetching book data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
