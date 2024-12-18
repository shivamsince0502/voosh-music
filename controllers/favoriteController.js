const { v4: uuidv4 } = require('uuid');
const Favorite = require('../models/Favorite');

// GET /favorites/:category - Retrieve Favorites
const getFavorites = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 5, offset = 0 } = req.query;

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
        await Favorite.findOneAndDelete({ favorite_id: req.params.id, user_id: req.user.id });
        res.status(200).json({ status: 200, message: 'Favorite removed successfully.', error: null });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
