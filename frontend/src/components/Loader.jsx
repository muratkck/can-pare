import React from 'react';
import '../App.css';

const Loader = () => {
  return (
    <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
