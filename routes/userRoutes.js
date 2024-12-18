const express = require('express');
const { signup, login, logout, getAllUsers, deleteUser, updatePassword } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user signup(all users)
router.post('/signup', signup); 

// Route for user login
router.post('/login', login); 

// Route for user logout
router.get('/logout', authMiddleware, logout);

// Route to get all users (admin only)
router.get('/users', authMiddleware, roleMiddleware(['admin']), getAllUsers); 

// Route to delete a user by email (admin only)
router.delete('/users/:email', authMiddleware, roleMiddleware(['admin']), deleteUser); 

// Route to update the user's password
router.put('/users/update-password', authMiddleware, updatePassword); 

// Route for admin to add a new user (admin only)
router.post('/users/add-user', authMiddleware, roleMiddleware(['admin']), signup); 


module.exports = router;
