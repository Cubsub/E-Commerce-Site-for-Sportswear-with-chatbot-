import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(''); // To track selected size
  const [showAlert, setShowAlert] = useState(false); // Alert if size is not selected

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      setShowAlert(true); // Show alert if size is not selected
    } else {
      addToCart(product.name, selectedSize, 1);
      setShowAlert(false); // Hide alert once the size is selected
    }
  };

  const handleSizeSelect = (e) => {
    setSelectedSize(e.target.value);
    setShowAlert(false); // Hide alert when a size is selected
  };

  return (
    <div className="product-card">
      <img
        src={process.env.PUBLIC_URL + product.image} // Correct path for images
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>

        <div className="size-selector">
          <label htmlFor="size-select">Choose size:</label>
          <select id="size-select" value={selectedSize} onChange={handleSizeSelect}>
            <option value="">--Select Size--</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <button className="btn-primary" onClick={handleAddToCartClick}>
          Add to Cart
        </button>

        {showAlert && <p className="alert-message">Please select a size before adding to cart.</p>}
      </div>
    </div>
  );
};

export default ProductCard;
