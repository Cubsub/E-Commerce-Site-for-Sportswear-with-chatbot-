import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllProducts.css'; // Assuming it's in the same directory


const fetchAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products'); // Make sure this matches your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    console.log('Fetched products:', data); // Log the data to ensure it's being fetched
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productData = await fetchAllProducts();
      setProducts(productData);
    };

    loadProducts();
  }, []);

  if (!products.length) return <div>Loading products...</div>;

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card"> {/* Use _id if that’s the key */}
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
