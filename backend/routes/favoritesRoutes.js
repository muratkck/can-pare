const express = require('express');
const router = express.Router();
const { addFavoriteProduct, getFavorites, deleteFavoriteProduct } = require('../controllers/favoriteController');
const asyncHandler = require('express-async-handler');

router.post('/add', asyncHandler(addFavoriteProduct));
router.get('/get/:email', asyncHandler(getFavorites));
router.delete('/delete', asyncHandler(deleteFavoriteProduct));
//console.log(router.stack);

module.exports = router;