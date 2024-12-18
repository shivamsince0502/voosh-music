const express = require('express');
const { getAllArtists, addArtist, updateArtist, getArtist, deleteArtist } = require('../controllers/artistController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');  // Make sure this is correct

const router = express.Router();


// Get All Artists (Requires Authentication)
router.get('/artists/all-artists', authMiddleware, getAllArtists);

// Add a New Artist (Requires Authentication and Admin Role)
router.post('/artists/add-artist', authMiddleware, roleMiddleware(['admin']), addArtist);

// Update an Artist by ID (Requires Authentication and Admin Role)
router.put('/artists/:id', authMiddleware, roleMiddleware(['admin']), updateArtist);

// Get an Artist by ID (Requires Authentication)
router.get('/artists/:id', authMiddleware, getArtist); 

// Delete an Artist by ID (Requires Authentication and Admin Role)
router.delete('/artists/:id', authMiddleware, roleMiddleware(['admin']), deleteArtist);

module.exports = router;
