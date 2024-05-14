const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to add or remove a bookmark
router.post('/:id/bookmark', bookController.addBookmark);
router.delete('/:id/bookmark', bookController.removeBookmark);

// Route to retrieve favorite marked books
router.get('/favorites', bookController.getFavoriteBooks);

// Route to add a read book
router.post('/:id/read', bookController.addReadBook);

// Route to retrieve read books
router.get('/read', bookController.getReadBooks);

module.exports = router;
