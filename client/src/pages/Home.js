// client/src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import { Link } from 'react-router-dom';



function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="brand">
          <h1>Sportswear</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search for products..." />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>
      

      <div className="hero-section">
        
        <h2>Get Ready for Your Next Adventure</h2>
        <p>Shop the latest sportswear for men and women</p>
        <Link to="/Men">
        <button className="btn btn-primary">Shop Now</button>
        </Link>
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

export default Home;
