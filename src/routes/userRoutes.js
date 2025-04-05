const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /users/:id - Get a user by ID
router.get('/:id', userController.getUserById.bind(userController));

module.exports = router; 