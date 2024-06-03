import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import axios from 'axios';
import { useSearchContext } from '../context/SearchContext';

const predefinedProducts = [
  'iphone', 'Samsung mobile phone', 'MacBook', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Dell Laptop', 'iPad', 'Bluetooth Earphone', 'GoPro'
];

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { searchResults, setSearchResults } = useSearchContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      const randomProduct = predefinedProducts[Math.floor(Math.random() * predefinedProducts.length)];
      setSearchQuery(randomProduct);
      await handleSearch(randomProduct);
    };
    
    fetchRandomProducts();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://can-pare-backend.vercel.app/api/search/${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='bg-[#f1f5f9] pt-32'>
      <Header handleSearch={handleSearch} />

      <div className="container mx-auto flex items-center justify-center" style={{ minHeight: '100vh'}}>
        <div className="w-full md:w-2/3 shadow-lg bg-[#fafaf9] mt-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {searchResults.map((product, index) => (
              <div key={index} className="flex">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
