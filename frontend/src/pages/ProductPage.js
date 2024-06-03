import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import SimilarCard from '../components/SimilarCard';
import { useProductContext } from '../context/ProductContext';
import axios from 'axios';

const ProductPage = () => {
  const { productData } = useProductContext();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);

  useEffect(() => {
    if (productData) {
      const query = productData.productName.split(' ').slice(0, 4).join(' ');
      fetchSimilarProducts(query);
      if (!predictedPrice) {
        generatePricePrediction(parseFloat(productData.productPrice));
      }
    }
  }, [productData]);

  const generatePricePrediction = (currentPrice) => {
    const percentageFluctuations = [1, 2, 3];
    const randomPercentage = percentageFluctuations[Math.floor(Math.random() * percentageFluctuations.length)];
    const randomAdjustment = (currentPrice * randomPercentage) / 100;
    const shouldIncrease = Math.random() < 0.5; // Randomly decide whether to increase or decrease

    const newPrice = shouldIncrease ? currentPrice + randomAdjustment : currentPrice - randomAdjustment;
    setPredictedPrice(parseFloat(newPrice.toFixed(2)));
  };

  const fetchSimilarProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://can-pare-backend.vercel.app/api/search/similar/${query}`);
      setSimilarProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const {
        productName,
        productPrice,
        productLink,
        productImage,
        productSeller,
        productRating,
        productRatingCount,
      } = productData;

      const response = await axios.post('https://can-pare-backend.vercel.app/api/users/favorites/add', {
        userEmail,
        productName,
        productPrice,
        productLink,
        productImage,
        productSeller,
        productRating,
        productRatingCount,
      });

      if (response.status === 201) {
        alert('Product added to favorites!');
      } else if (response.status === 400) {
        alert('Product already exists in favorites!');
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Product already exists in favorites!');
      } else {
        console.error('Failed to add product to favorites', error);
        alert('Failed to add product to favorites');
      }
    }
  };
  
  const handleBuyNow = () => {
    window.open(productData.productLink, '_blank', 'noopener,noreferrer');
  };

  if (!productData) {
    return <div className="container mx-auto mt-44 text-center">No product data found</div>;
  }
  const priceDifferenceClassName = predictedPrice !== null && productData.productPrice > predictedPrice ? 'text-lg text-green-500' : 'text-lg text-red-500';

  return (
    <div className='bg-[#f1f5f9]'>
      <Header />
      {loading && <Loader />}
      <div className="container mx-auto mt-20 py-10" style={{ minHeight: '100vh' }}>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center">
          <div className="w-5/6 md:w-1/3 mb-6 md:mb-0">
            <img
              src={productData.productImage}
              alt={productData.productName}
              className="rounded-lg shadow-md"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <h2 className="text-3xl font-semibold mb-3">{productData.productName}</h2>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 rating-star ${
                      index < Math.floor(parseFloat(productData.productRating)) ? 'text-[#fde047]' : 'text-[#e5e7eb]'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                ))}
              </div>
              <span className="bg-[#dbeafe] text-[#1e40af] text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-[#dbeafe] dark:text-[#1e40af] ms-3 items-center">{productData.productRating} in {productData.productRatingCount} Rating</span>
            </div>
            <p className="text-lg text-gray-500 mb-1">Sold by: {productData.productSeller}</p>
            <p className="text-xl font-bold text-gray-800">Price: ${productData.productPrice}</p>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {predictedPrice && <span className={priceDifferenceClassName}>Predicted Price in 15-20 days: ${predictedPrice}</span>}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className="text-white bg-[#1d4ed8] hover:bg-[#1e40af] active:bg-[#1e3a8a] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:active:[#1e40af] dark:focus:ring-[#1e40af] cursor-pointer"
                onClick={addToFavorites}
              >
                Add to Favorites
              </button>
              <button
   
                onClick={handleBuyNow}
                className="text-white bg-[#a855f7] hover:bg-[#7e22ce] active:bg-[#581c87] focus:ring-4 focus:outline-none focus:ring-[#a855f7] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:active:[#1e40af] dark:focus:ring-[#1e40af] cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-wrap gap-4 justify-center">
            <h2 className="text-2xl font-semibold mb-4">Other Sellers:</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {similarProducts.map((item, index) => ( // Add index parameter here
                <SimilarCard key={item.productId} product={item} index={index} /> // Pass index as prop
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
