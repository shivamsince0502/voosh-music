const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    grammyCount: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Artist', ArtistSchema);
