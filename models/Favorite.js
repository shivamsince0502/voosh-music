const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    favorite_id: { type: String, required: true, unique: true },
    category: { type: String, enum: ['artist', 'album', 'track'], required: true },
    item_id: { type: String, required: true },
    user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
