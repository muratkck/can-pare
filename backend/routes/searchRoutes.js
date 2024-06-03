const express = require('express');
const router = express.Router();
const { searchProducts, searchSimilarProducts } = require('../controllers/searchController');

router.get('/:query', searchProducts);
router.get('/similar/:query', searchSimilarProducts);
//console.log(router.stack);
module.exports = router;
