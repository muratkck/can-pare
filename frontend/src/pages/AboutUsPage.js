import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 py-10" style={{ minHeight: '90vh' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            We are a team dedicated to providing the best services and products to our customers. 
            With years of experience in the industry, we pride ourselves on our expert knowledge 
            and the high quality of our offerings. Our mission is to ensure customer satisfaction 
            by meeting their needs and exceeding their expectations. Join us on our journey and 
            discover the difference quality makes.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
