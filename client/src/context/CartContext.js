// context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart (both in state and backend)
  const addToCart = async (productName, size, quantity) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use token for authentication
        },
        body: JSON.stringify({
          productName,
          size,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart([...cart, data.cartItem]); // Assuming `data.cartItem` is returned from the backend
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Increase quantity in both the state and backend
  const increaseQuantity = async (productId, size) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);

    // Update quantity in the backend
    await fetch('http://localhost:5000/api/cart/increase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, size })
    });
  };

  // Decrease quantity in both the state and backend
  const decreaseQuantity = async (productId, size) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId && item.size === size && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);

    // Update quantity in the backend
    await fetch('http://localhost:5000/api/cart/decrease', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, size })
    });
  };

  // Remove item from cart
  const removeFromCart = async (productId, size) => {
    const updatedCart = cart.filter((item) => !(item.productId === productId && item.size === size));
    setCart(updatedCart);

    // Remove from the backend
    await fetch('http://localhost:5000/api/cart/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, size })
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
