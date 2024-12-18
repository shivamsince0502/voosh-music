const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    track_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    artist_id: { type: String, required: true },
    album_id: { type: String, required: true },
    hidden: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Track', TrackSchema);
