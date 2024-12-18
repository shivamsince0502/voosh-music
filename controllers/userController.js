const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const log = require('../utils/logger');
const { addToBlacklist, isTokenBlacklisted } = require('../config/redisdb')

// User Signup
const signup = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;
        console.log("req.body : ", req.body)
        const validRoles = ['editor', 'viewer', 'admin'];
        if (role && !validRoles.includes(role)) {
            log.warn('Invalid role specified');
            return res.status(400).json({ status: 400, message: "Bad Request, Reason: Invalid role", error: null });
        }
        if (role === 'admin') {
            const existingAdmin = await User.findOne({ role: 'admin' });
            if (existingAdmin) {
                log.warn('Attempt to create another admin user');
                return res.status(403).json({
                    status: 403,
                    message: "Forbidden: Only one admin is allowed in the system.",
                    error: null
                });
            }
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            log.warn(`Attempt to create existing email: ${email}`);
            return res.status(409).json({ status: 409, message: "Email already exists", error: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword, role: role || 'viewer' });
        await newUser.save();

        log.info(`User ${email} created successfully`);
        res.status(201).json({ status: 201, message: "User created successfully", error: null });
    } catch (error) {
        log.error(error.message);
        res.status(400).json({ status: 400, message: "Bad Request", error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            log.warn(`Login failed: User not found - ${email}`);
            return res.status(404).json({ status: 404, message: "User not found", error: null });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            log.warn(`Invalid password attempt for user: ${email}`);
            return res.status(401).json({ status: 401, message: "Invalid credentials", error: null });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        log.info(`User ${email} logged in successfully`);
        res.status(200).json({ status: 200, data: { token }, message: "Login successful", error: null });
    } catch (error) {
        log.error(error.message);
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            const decoded = jwt.decode(token);
            const expiryInSeconds = decoded?.exp - Math.floor(Date.now() / 1000);
            if (expiryInSeconds > 0) {
                await addToBlacklist(token, expiryInSeconds);
            }
        }

        log.info(`User logged out successfully: ${req.user?.email}`);
        res.status(200).json({ 
            status: 200, 
            message: 'User logged out successfully', 
            error: null 
        });
    } catch (error) {
        log.error(error.message);
        res.status(500).json({ 
            status: 500, 
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
};

// Retrieve All Users (Admin Only)
const getAllUsers = async (req, res) => {
    try {
        const { limit = 5, offset = 0, role } = req.query;

        const query = role ? { role: role.toLowerCase() } : {};

        const users = await User.find(query)
            .skip(parseInt(offset))
            .limit(parseInt(limit));

        log.info(`Admin ${req.user.email} retrieved the user list successfully`);
        res.status(200).json({
            status: 200,
            data: users,
            message: "Users retrieved successfully",
            error: null
        });
    } catch (error) {
        log.error(`Error retrieving user list: ${error.message}`);
        res.status(400).json({
            status: 400,
            data: null,
            message: "Bad Request",
            error: error.message
        });
    }
};


//delete a user
const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            log.warn(`Unauthorized delete attempt by user ${req.user.email}`);
            return res.status(403).json({
                status: 403,
                message: "Forbidden Access: Only admins can delete users",
                error: null
            });
        }

        const { email } = req.params;  
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            log.warn(`Delete failed: User not found - ${user_id}`);
            return res.status(404).json({
                status: 404,
                message: "User not found",
                error: null
            });
        }

        log.info(`User ${user.email} deleted successfully`);
        res.status(200).json({
            status: 200,
            message: "User deleted successfully",
            error: null
        });
    } catch (error) {
        log.error(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user || !(await bcrypt.compare(old_password, user.password))) {
            log.warn(`Password update failed for user ${user.email}`);
            return res.status(400).json({
                status: 400,
                message: "Incorrect old password",
                error: null
            });
        }

        user.password = await bcrypt.hash(new_password, 10);
        await user.save();

        log.info(`Password for ${user.email} updated successfully`);

        res.status(200).json({
            status: 200,
            message: "Password updated successfully",
            error: null
        });
    } catch (error) {
        log.error(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};





module.exports = { signup, login, logout, getAllUsers, deleteUser, updatePassword };
