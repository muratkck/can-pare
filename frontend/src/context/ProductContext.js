
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);

  const setProduct = (product) => {
    setProductData(product);
  };

  return (
    <ProductContext.Provider value={{ productData, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
