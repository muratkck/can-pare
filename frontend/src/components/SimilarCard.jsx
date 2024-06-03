import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const SimilarCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { setProduct } = useProductContext();

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Stop event propagation
    window.open(product.productLink, '_blank', 'noopener,noreferrer');
  };

  const handleProductClick = () => {
    setProduct(product);
    navigate('/product-page');
  };

  return (
    <div
      className="w-full md:w-2/3 p-2 cursor-pointer hover:scale-105 transition-transform transform"
      onClick={handleProductClick}
    >
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center justify-between">
        <div className="w-1/8 mx-4">
          <img
            src={product.productImage}
            alt={product.productName}
            className="rounded-lg shadow-md"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
        <div className="w-3/4 pl-4">
          <p className="text-md text-gray-500">Sold by: {product.productSeller}</p>
          <p className="text-md font-bold text-gray-800">Price: ${product.productPrice}</p>
          <div className="flex items-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 rating-star ${
                  i < Math.floor(parseFloat(product.productRating)) ? 'text-[#fde047]' : 'text-[#e5e7eb]'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          {index === 0 && (
            <span className="text-[#22c55e] px-2 py-1 text-xs font-semibold mb-2">Cheapest Product</span>
          )}
          <button
            onClick={handleBuyNow}
            className="text-white bg-[#a855f7] hover:bg-[#7e22ce] active:bg-[#581c87] focus:ring-4 focus:outline-none focus:ring-[#a855f7] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:active:[#1e40af] dark:focus:ring-[#1e40af] cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarCard;
