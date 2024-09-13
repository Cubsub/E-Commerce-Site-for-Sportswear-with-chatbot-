import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';  
import './CartPage.css';

const CartPage = () => {
  const { cart, setCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/cart', {
            headers: {
              'Authorization': `Bearer ${token}`, // Pass the token in Authorization header
            },
          });
          const data = await response.json();
          setCart(data.items || []); // Set cart to an empty array if no items
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      } else {
        setLoading(false);
      }
    };

    fetchCart(); // Fetch cart when the component loads
  }, [setCart]);

  // Safely calculate total price by checking if price exists
  const totalPrice = cart.reduce((acc, item) => {
    return acc + (item && item.price ? item.price * item.quantity : 0);
  }, 0);

  if (loading) {
    return <p>Loading your cart...</p>; // Display a loading message while fetching cart
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              item ? ( // Check if item is not undefined
                <li key={item.productId + item.size} className="cart-item">
                   <img 
                    src={process.env.PUBLIC_URL + item.image}  // Correct image path from public folder
                    alt={item.name} 
                    className="cart-item-image" 
                  />
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price ? item.price.toFixed(2) : "N/A"}</p>
                    <p>Size: {item.size}</p>
                    <div className="quantity-control">
                      <button onClick={() => decreaseQuantity(item.productId, item.size)} className="btn btn-secondary">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.productId, item.size)} className="btn btn-secondary">+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ) : (
                <li key={Math.random()} className="cart-item">
                  <p>Item data is missing.</p>
                </li>
              )
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="btn btn-primary">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
