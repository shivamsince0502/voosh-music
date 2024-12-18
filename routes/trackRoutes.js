const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack } = require('../controllers/trackController');

const router = express.Router();

// Get All Tracks (Requires Authentication)
router.get('/tracks/all-tracks', authMiddleware, getAllTracks);

// Get a Track by ID (Requires Authentication)
router.get('/tracks/:id', authMiddleware, getTrackById);

// Add a New Track (Requires Authentication)
router.post('/tracks/add-track', authMiddleware, addTrack);

// Update a Track by ID (Requires Authentication)
router.put('/tracks/:id', authMiddleware, updateTrack);

// Delete a Track by ID (Requires Authentication)
router.delete('/tracks/:id', authMiddleware, deleteTrack);

module.exports = router;
