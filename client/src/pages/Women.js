import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import './productCollection.css';


function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling error state

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/gender/Women'); // Fetch products for Men
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Update products in state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an error
  }

  return (
    <div className="product-collection">
      <h1>Men's Collection</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for Men</p> // Display this if no products are found
        )}
      </div>
      <footer className="footer">
        <motion.div
          className="social-icons"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </motion.div>
        <p>&copy; {new Date().getFullYear()} Sportswear Store. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Men;
