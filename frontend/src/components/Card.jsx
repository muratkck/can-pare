import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Card = ({ product }) => {
  const navigate = useNavigate();
  const { setProduct } = useProductContext();
  
    const handleProductClick = () => {
      setProduct(product);
      navigate('/product-page');
    };
  
    const addToFavorites = async (event) => {
      event.stopPropagation();
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
        } = product;
  
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
  
    return (
      <div className='mx-auto my-2'>
        <div className="w-96 h-96 bg-white border border-[#e5e7eb] rounded-lg shadow-lg dark:bg-[#1f2937] dark:border-[#6b7280] transition-transform transform hover:scale-105 cursor-pointer flex flex-col" style={{height: '400px' }} onClick={handleProductClick}>
          <img className="h-44 my-2 mx-auto p-2 rounded-t-lg object-contain" src={product.productImage} alt="Product" />
          <div className="px-5 pb-5 flex flex-col flex-grow">
            <div className="flex-grow">
              <h5 className="text-xl font-semibold tracking-tight text-[#111827] dark:text-white">{product.productName}</h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 rating-star ${
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
                <span className="bg-[#dbeafe] text-[#1e40af] text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-[#dbeafe] dark:text-[#1e40af] ms-3 items-center">{product.productRating} in {product.productRatingCount} Rating</span>
                
              </div>
                <span className="text-lg text-gray-500 mb-1">Seller: {product.productSeller}</span>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-3xl font-bold text-[#111827] dark:text-white">${product.productPrice}</span>
              <button onClick={(e) => addToFavorites(e)} className="text-white bg-[#1d4ed8] hover:bg-[#1e40af] active:bg-[#1e3a8a] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:active:[#1e40af] dark:focus:ring-[#1e40af] cursor-pointer">Add to Favorites</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;