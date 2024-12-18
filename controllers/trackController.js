const { v4: uuidv4 } = require('uuid');
const Track = require('../models/Track');
const log = require('../utils/logger');

// GET /tracks - Retrieve All Tracks
const getAllTracks = async (req, res) => {
    try {
        const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

        const query = {};
        if (artist_id) query.artist_id = artist_id;
        if (album_id) query.album_id = album_id;
        if (hidden !== undefined) query.hidden = hidden === 'true';

        const tracks = await Track.find(query)
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('artist_id album_id');  

        res.status(200).json({
            status: 200,
            data: tracks,
            message: 'Tracks retrieved successfully.',
            error: null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET /tracks/:id - Retrieve a Track
const getTrackById = async (req, res) => {
    try {
        const track = await Track.findOne({ track_id: req.params.id }).populate('artist_id album_id');
        if (!track) return res.status(404).json({ error: 'Track not found' });

        res.status(200).json({
            status: 200,
            data: track,
            message: 'Track retrieved successfully.',
            error: null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addTrack = async (req, res) => {
    try {
        const { name, duration, artist_id, album_id, hidden } = req.body;

        const existingTrack = await Track.findOne({ artist_id, album_id, name });
        if (existingTrack) {
            return res.status(400).json({
                status: 400,
                message: 'Track with the same artist, album, and name already exists.',
                error: 'Conflict: Track already exists'
            });
        }

        const newTrack = new Track({
            track_id: uuidv4(),
            name,
            duration,
            artist_id,
            album_id,
            hidden
        });

        await newTrack.save();
        res.status(201).json({
            status: 201,
            message: 'Track created successfully.',
            error: null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// PUT /tracks/:id - Update a Track
const updateTrack = async (req, res) => {
    try {
        const updatedData = req.body;
        const track = await Track.findOneAndUpdate(
            { track_id: req.params.id },
            updatedData,
            { new: true }
        );

        if (!track) return res.status(404).json({ error: 'Track not found' });

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE /tracks/:id - Delete a Track
const deleteTrack = async (req, res) => {
    try {
        const track = await Track.findOneAndDelete({ track_id: req.params.id });
        if (!track) return res.status(404).json({ error: 'Track not found' });

        res.status(200).json({
            status: 200,
            message: `Track: ${track.name} deleted successfully.`,
            error: null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack };
