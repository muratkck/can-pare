import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';

const FavoriteCard = ({ product, removeFromFavorites }) => {
  const navigate = useNavigate();
  const { setProduct } = useProductContext();
  
  const handleProductClick = () => {
    setProduct(product);
    navigate('/product-page'); 
  };


  return (
    <div className='mx-auto my-2'>
      <div className="w-64 h-96 bg-white border border-[#e5e7eb] rounded-lg shadow-lg dark:bg-[#1f2937] dark:border-[#6b7280] transition-transform transform hover:scale-105 cursor-pointer flex flex-col" >
        <img className="h-32 my-1 mx-auto p-2 rounded-t-lg object-contain" src={product.productImage} alt="Product" />
        <div className="px-4 pb-4 flex flex-col flex-grow">
          <h5 className="text-lg font-semibold tracking-tight text-[#111827] dark:text-white">{product.productName}</h5>
          <div className="flex-grow" onClick={handleProductClick}>
            <div className="flex items-center mt-1 mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-3 h-3 rating-star ${
                      index < Math.floor(parseFloat(product.productRating)) ? 'text-[#fde047]' : 'text-[#e5e7eb]'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                ))}
              </div>
              <span className="bg-[#dbeafe] text-[#1e40af] text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-[#dbeafe] dark:text-[#1e40af] ms-3 items-center">{product.productRating} in {product.productRatingCount} ratings</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-[#111827] dark:text-white">${product.productPrice}</span>
            <button 
              onClick={() =>
                removeFromFavorites(product) // Call removeFromFavorites function
              } 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Remove from Favorites
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
