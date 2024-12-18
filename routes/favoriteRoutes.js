const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');

const router = express.Router();

// Get Favorites by Category (Requires Authentication)
router.get('/favorites/:category', authMiddleware, getFavorites);

// Add a New Favorite (Requires Authentication)
router.post('/favorites/add-favorite', authMiddleware, addFavorite);

// Remove a Favorite by ID (Requires Authentication)
router.delete('/favorites/remove-favorite/:id', authMiddleware, removeFavorite);

module.exports = router;
