const Album = require('../models/Album');
const Artist = require('../models/Artist');
const log = require('../utils/logger');

// GET /albums - Retrieve All Albums
const getAlbums = async (req, res) => {
    try {
        const { limit = 5, offset = 0, artist_id, hidden } = req.query;

        const filter = {};
        if (artist_id) {
            const artist = await Artist.findById(artist_id);
            if (!artist) {
                return res.status(404).json({ status: 404, message: 'Artist not found', error: 'Invalid artist ID' });
            }
            filter.artistId = artist_id;
        }

        if (hidden !== undefined) {
            filter.visible = hidden === 'true';
        }

        const albums = await Album.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('artistId');

        log.info('Fetched albums successfully');
        res.status(200).json({
            status: 200,
            data: albums,
            message: 'Albums retrieved successfully.',
            error: null,
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message,
        });
    }
};

// GET /albums/:id - Retrieve an Album
const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artistId');
        if (!album) {
            return res.status(404).json({ status: 404, message: 'Resource Doesn\'t Exist', error: 'Album not found' });
        }

        log.info(`Album ${album.name} fetched successfully`);
        res.status(200).json({
            status: 200,
            data: album,
            message: 'Album retrieved successfully.',
            error: null,
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message,
        });
    }
};

// POST /albums/add-album - Add a New Album
const addAlbum = async (req, res) => {
    try {
        const { artistId, name, year, visible } = req.body;

        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ status: 404, message: 'Artist not found', error: 'Invalid artist ID' });
        }

        const album = new Album({
            artistId,
            name,
            year,
            visible: visible !== undefined ? visible : true,
        });

        await album.save();

        log.info('Album added successfully');
        res.status(201).json({
            status: 201,
            message: 'Album created successfully',
            data: album,
            error: null,
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message,
        });
    }
};

// PUT /albums/:id - Update an Album
const updateAlbum = async (req, res) => {
    try {
        const { name, year, visible } = req.body;
        const album = await Album.findByIdAndUpdate(
            req.params.id,
            { name, year, visible },
            { new: true, runValidators: true }
        );

        if (!album) {
            return res.status(404).json({ status: 404, message: 'Resource Doesn\'t Exist', error: 'Album not found' });
        }

        log.info(`Album ${album.name} updated successfully`);
        res.status(204).json({
            status: 204,
            message: 'Album updated successfully',
            error: null,
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message,
        });
    }
};

// DELETE /albums/:id - Delete an Album
const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) {
            return res.status(404).json({ status: 404, message: 'Resource Doesn\'t Exist', error: 'Album not found' });
        }

        log.info(`Album ${album.name} deleted successfully`);
        res.status(200).json({
            status: 200,
            message: `Album ${album.name} deleted successfully`,
            error: null,
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message,
        });
    }
};

module.exports = { getAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum };
