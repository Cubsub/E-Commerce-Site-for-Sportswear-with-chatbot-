// client/src/pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = ({ products }) => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Extract search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    // Filter products based on the query
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
