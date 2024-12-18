const express = require('express');
const { getAlbums, addAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');  // Update the middleware import

const router = express.Router();

// Get All Albums (Requires Authentication)
router.get('/album/all-albums', authMiddleware, getAlbums);

// Add a New Album (Requires Authentication and Admin Role)
router.post('/album/add-album', authMiddleware, roleMiddleware(['admin']), addAlbum);

// Update an Album by ID (Requires Authentication and Admin Role)
router.put('/album/:id', authMiddleware, roleMiddleware(['admin']), updateAlbum);

// Delete an Album by ID (Requires Authentication and Admin Role)
router.delete('/album/:id', authMiddleware, roleMiddleware(['admin']), deleteAlbum);

module.exports = router;
