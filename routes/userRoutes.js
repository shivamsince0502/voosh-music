const express = require('express');
const { signup, login, logout, getAllUsers, deleteUser, updatePassword } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/logout', authMiddleware, logout);
router.get('/users', authMiddleware, roleMiddleware(['admin']), getAllUsers);
router.delete('/users/:email', authMiddleware, roleMiddleware(['admin']), deleteUser);
router.put('/users/update-password', authMiddleware, updatePassword);
router.post('/users/add-user', authMiddleware, roleMiddleware(['admin']), signup);

module.exports = router;
