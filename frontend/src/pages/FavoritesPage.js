import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteCard from '../components/FavoriteCard';
import Loader from '../components/Loader';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      axios.get(`https://can-pare-backend.vercel.app/api/users/favorites/get/${userEmail}`)
      .then(response => {
        setFavorites(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch favorites', err);
        setError('Failed to load favorites. Please try again later.');
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const removeFromFavorites = async (product) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await axios.delete('https://can-pare-backend.vercel.app/api/users/favorites/delete', {
        data: {
          userEmail,
          productName: product.productName,
          productPrice: product.productPrice,
          productLink: product.productLink,
          productImage: product.productImage,
          productSeller: product.productSeller,
          productRating: product.productRating,
          productRatingCount: product.productRatingCount,
        }
      });

      if (response.status === 200) {
        alert('Product removed from favorites!');
        setFavorites(favorites.filter(fav => fav._id !== product._id));
      }
    } catch (error) {
      console.error('Failed to remove product from favorites', error);
      alert('Failed to remove product from favorites');
    }
  };

  return (
    <div className='bg-[#f1f5f9] pt-20'>
      <Header />
      <div className="" style={{ minHeight: '100vh'}}>
        <div className="bg-gray-800 text-white p-4 shadow">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold">Your Favorite Products</h2>
          </div>
        </div>
        <div className="container mx-auto mt-10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <FavoriteCard key={item._id} product={item} removeFromFavorites={removeFromFavorites} />
                ))
              ) : (
                <p className="text-left text-xl">No favorites added yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
