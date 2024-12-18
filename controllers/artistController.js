const Artist = require('../models/Artist');
const log = require('../utils/logger');

// Get All Artists without any filters
const getAllArtists = async (req, res) => {
    try {
        // Fetch all artists without any filters
        const artists = await Artist.find();

        log.info('Fetched all artists successfully');
        res.status(200).json({
            status: 200,
            message: "All artists fetched successfully",
            artists,
            error: null
        });
    } catch (error) {
        log.error(`Error fetching artists: ${error.message}`);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// Add a New Artist
const addArtist = async (req, res) => {
    try {
        const { name, grammyCount, visible } = req.body;

        // Check for duplicate artist name
        const existingArtist = await Artist.findOne({ name });
        if (existingArtist) {
            log.warn(`Artist with name '${name}' already exists`);
            return res.status(409).json({
                status: 409,
                message: "Artist with this name already exists",
                error: null
            });
        }

        const artist = new Artist({
            name,
            grammyCount: grammyCount || 0,
            visible: visible !== undefined ? visible : true
        });

        await artist.save();

        log.info(`Artist '${name}' added successfully`);
        res.status(201).json({
            status: 201,
            message: "Artist added successfully",
            artist,
            error: null
        });
    } catch (error) {
        log.error(`Error adding artist: ${error.message}`);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            error: error.message
        });
    }
};

// Update an Artist by ID
const updateArtist = async (req, res) => {
    try {
        const { name, grammyCount, visible } = req.body;

        const artist = await Artist.findByIdAndUpdate(
            req.params.id,
            { name, grammyCount, visible },
            { new: true, runValidators: true }
        );

        if (!artist) {
            log.warn(`Artist not found with ID: ${req.params.id}`);
            return res.status(404).json({
                status: 404,
                message: "Artist not found",
                error: null
            });
        }

        log.info(`Artist '${artist.name}' updated successfully`);
        res.status(200).json({
            status: 200,
            message: "Artist updated successfully",
            artist,
            error: null
        });
    } catch (error) {
        log.error(`Error updating artist: ${error.message}`);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            error: error.message
        });
    }
};

// Get a Single Artist by ID
const getArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const artist = await Artist.findById(id); // Use ID-based search here
        if (!artist) {
            log.warn(`Artist not found with ID: '${id}'`);
            return res.status(404).json({
                status: 404,
                message: "Artist not found",
                error: null
            });
        }

        log.info(`Fetched artist: '${artist.name}'`);
        res.status(200).json({
            status: 200,
            message: "Artist fetched successfully",
            artist,
            error: null
        });
    } catch (error) {
        log.error(`Error fetching artist: ${error.message}`);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Delete an Artist by ID
const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);

        if (!artist) {
            log.warn(`Artist not found with ID: ${req.params.id}`);
            return res.status(404).json({
                status: 404,
                message: "Artist not found",
                error: null
            });
        }

        log.info(`Artist '${artist.name}' deleted successfully`);
        res.status(200).json({
            status: 200,
            message: "Artist deleted successfully",
            error: null
        });
    } catch (error) {
        log.error(`Error deleting artist: ${error.message}`);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            error: error.message
        });
    }
};

module.exports = { getAllArtists, addArtist, updateArtist, getArtist, deleteArtist };
