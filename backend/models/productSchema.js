const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productLink: { type: String, required: true },
  productImage: { type: String, required: true },
  productSeller: { type: String, required: true },
  productRating: { type: String, default: null },
  productRatingCount: { type: String, default: null }
});

module.exports = mongoose.model('Product', productSchema);
