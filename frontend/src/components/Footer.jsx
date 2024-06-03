import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">can-pare</Link>
          <p className="text-sm mt-2">© 2024 can-pare, Inc. All rights reserved.</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Link to="/about" className="px-4 hover:underline">About Us</Link>
          <Link to="/contact" className="px-4 hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
