import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions like removing auth token
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className='w-full bg-blue shadow-md fixed'>
      <nav className='flex items-center justify-between py-2 px-6'>
        <div className='flex items-center '>
          <Link to="/">
            <img src="https://iyte.edu.tr/wp-content/uploads/2019/02/iyte-logo-transparan-360px.png"  alt="Logo" className='w-20 h-20 object-cover ml-0' />
          </Link> 
        </div>
        <div className='flex-1 text-center'>
          <h1 className='text-white text-2xl font-semibold'>
            <Link to="/" className="text-white text-2xl font-semibold">
                can-pare
            </Link>  
          </h1>
        </div>
        {location.pathname === '/' && (
          <div>
            <button 
              onClick={handleLogout} 
              className='bg-white text-blue-600 font-semibold py-2 px-4 rounded'
            >
              Log out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
