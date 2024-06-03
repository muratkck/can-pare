const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getUsers, addFavoriteProduct, getFavorites, protect } = require('../controllers/userController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', authUser);


router.get('/getUsers', getUsers);
router.get('/:email', getUser); // Route to get a user by email
console.log(router.stack);
module.exports = router;
