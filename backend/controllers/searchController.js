const axios = require('axios');

const searchProducts = async (req, res) => {
  const { query } = req.params;
  //console.log(query);
  try {
    const fetchedProducts = await fetchGoogleShoppingData(query);
    const googleShoppingProducts = fetchedProducts.slice(0, 8);
    
    googleShoppingProducts.sort((a, b) => a.productPrice - b.productPrice);
    res.json(googleShoppingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
};

const searchSimilarProducts = async (req, res) => {
  const { query } = req.params;
  //console.log("Muratt");
  try {
    const googleShoppingProducts = await fetchGoogleShoppingData(query);
    const similarProducts = googleShoppingProducts.slice(0, 3); // Take only the first 3 products
    similarProducts.sort((a, b) => a.productPrice - b.productPrice);
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch similar products' });
  }
};

const fetchGoogleShoppingData = async (query) => {
  let data = JSON.stringify({
    "q": query,
    "location": "United States",
    "gl": "tr"
  });

  let config = {
    method: 'post',
    url: 'https://google.serper.dev/shopping',
    headers: { 
      'X-API-KEY': '002975581c697ef734a55fedb7397c97e40110ab', 
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    const products = response.data.shopping; // Take only the first 8 products
    return products.map(product => {
      // Extract the numeric part of the price and convert it to a float
      const priceFloat = parseFloat(product.price.replace(/[^0-9,.-]/g, '').replace(',', '.'));
      return {
        productName: product.title,
        productPrice: priceFloat,
        productLink: product.link,
        productImage: product.imageUrl,
        productSeller: product.source,
        productRating: product.rating,
        productRatingCount: product.ratingCount,
      };
    });
  } catch (error) {
    console.error('Error fetching data from API', error);
    throw new Error('Failed to fetch product data from API');
  }
};

module.exports = { searchProducts, searchSimilarProducts };
