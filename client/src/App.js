// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import About from './pages/About';
import Login from './components/Login';
import Register from './components/Register';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails';
import Chatbot from './components/Chatbot';
import AllProducts from './pages/AllProducts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is authenticated if token is present
    } else {
      setIsAuthenticated(false); // Not authenticated if no token
    }
  }, []);

  return (
    <Router>
      <Header />
      <Chatbot /> {/* Add the Chatbot to be available on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes: accessible only if authenticated */}
        <Route
          path="/cart"
          element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/products" element={<AllProducts />} /> 
      </Routes>
    </Router>
  );
}

export default App;
