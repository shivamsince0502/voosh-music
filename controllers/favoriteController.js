const { v4: uuidv4 } = require('uuid');
const Favorite = require('../models/Favorite');

// GET /favorites/:category - Retrieve Favorites
const getFavorites = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 5, offset = 0 } = req.query;

        // Validate category
        const validCategories = ['artist', 'album', 'track'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid category. Allowed categories: artist, album, track.',
                error: 'Invalid category'
            });
        }

        const favorites = await Favorite.find({ category, user_id: req.user.id })
            .skip(Number(offset))
            .limit(Number(limit));

        res.status(200).json({
            status: 200,
            data: favorites,
            message: 'Favorites retrieved successfully.',
            error: null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// POST /favorites/add-favorite - Add a Favorite
const addFavorite = async (req, res) => {
    try {
        const { category, item_id } = req.body;

        // Validate category
        const validCategories = ['artist', 'album', 'track'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid category. Allowed categories: artist, album, track.',
                error: 'Invalid category'
            });
        }

        // Check if the favorite already exists for the user
        const existingFavorite = await Favorite.findOne({
            category,
            item_id,
            user_id: req.user.id
        });
        if (existingFavorite) {
            return res.status(400).json({
                status: 400,
                message: 'This item is already in your favorites.',
                error: 'Favorite already exists'
            });
        }

        const newFavorite = new Favorite({
            favorite_id: uuidv4(),
            category,
            item_id,
            user_id: req.user.id
        });

        await newFavorite.save();
        res.status(201).json({ status: 201, message: 'Favorite added successfully.', error: null });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /favorites/remove-favorite/:id - Remove a Favorite
const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            favorite_id: req.params.id,
            user_id: req.user.id
        });

        if (!favorite) {
            return res.status(404).json({
                status: 404,
                message: 'Favorite not found.',
                error: 'Not Found'
            });
        }

        res.status(200).json({ status: 200, message: 'Favorite removed successfully.', error: null });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
