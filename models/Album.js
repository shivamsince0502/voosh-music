const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artistId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Artist', 
        required: true 
    },
    visible: { type: Boolean, default: true }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Album', AlbumSchema);
