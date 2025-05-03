const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// Add to favorites (protected)
router.post('/favorites', auth, userController.addFavorite);

// Get favorites (protected)
router.get('/favorites', auth, userController.getFavorites);

module.exports = router;