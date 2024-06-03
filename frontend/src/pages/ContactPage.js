import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css'
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://can-pare-backend.vercel.app/api/sendMessage', { name, message });
      alert('Your message has been sent successfully!');
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 py-10" style={{ minHeight: '90vh' }}>
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mt-4">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Send Message
            </button>
          </form>
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="mt-2 text-lg text-gray-700">Email: ceng318@iyte.edu.tr</p>
            <p className="text-lg text-gray-700">Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
