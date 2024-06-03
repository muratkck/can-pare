const User = require('../models/User');
const Product = require('../models/productSchema');
const asyncHandler = require('express-async-handler');

// @desc    Add a product to favorites
// @route   POST /api/users/favorites/add
// @access  Private
const addFavoriteProduct = asyncHandler(async (req, res) => {
  const { userEmail, productName, productPrice, productLink, productImage, productSeller, productRating, productRatingCount } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check if the product already exists in favorites
  const exists = user.favorites.find(favorite => 
    favorite.productName === productName &&
    favorite.productPrice == productPrice &&
    favorite.productLink === productLink &&
    favorite.productImage === productImage &&
    favorite.productSeller === productSeller &&
    favorite.productRating == productRating &&
    favorite.productRatingCount == productRatingCount
  );

  if (exists) {
    res.status(400);
    throw new Error('Product already in favorites');
  }

  // Create a new product using the Product schema
  const newProduct = {
    productName,
    productPrice,
    productLink,
    productImage,
    productSeller,
    productRating,
    productRatingCount
  };

  // Add the new product to user's favorites
  user.favorites.push(newProduct);
  await user.save();

  res.status(201).json({ message: 'Product added to favorites' });
});

// @desc    Get user's favorites
// @route   GET /api/users/favorites/get
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const { email } = req.params; // Assuming the email is sent as a query parameter
  //console.log(email);
  
  const user = await User.findOne({ email: email }); // No need to populate
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Reverse the order of the favorites array
  const reversedFavorites = user.favorites.reverse();
  
  res.json(reversedFavorites);
});


// @desc    Delete a product from favorites
// @route   DELETE /api/users/favorites/delete
// @access  Private
const deleteFavoriteProduct = asyncHandler(async (req, res) => {
  const { userEmail, productName, productPrice, productLink, productImage, productSeller, productRating, productRatingCount } = req.body;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Find the index of the product to be deleted
  const productIndex = user.favorites.findIndex(favorite => 
    favorite.productName === productName &&
    favorite.productPrice == productPrice &&
    favorite.productLink === productLink &&
    favorite.productImage === productImage &&
    favorite.productSeller === productSeller &&
    favorite.productRating == productRating &&
    favorite.productRatingCount == productRatingCount
  );

  if (productIndex === -1) {
    res.status(404);
    throw new Error('Product not found in favorites');
  }

  // Remove the product from favorites
  user.favorites.splice(productIndex, 1);
  await user.save();

  res.status(200).json({ message: 'Product removed from favorites' });
});

module.exports = {
  addFavoriteProduct,
  getFavorites,
  deleteFavoriteProduct
};
