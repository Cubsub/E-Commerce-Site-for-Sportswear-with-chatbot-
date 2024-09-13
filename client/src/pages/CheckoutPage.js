// client/src/pages/CheckoutPage.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css'; // Create a CSS file for styling

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  // Calculate the total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle the checkout submission (for now, just logging the data)
  const handleCheckout = (e) => {
    e.preventDefault();
    console.log('Shipping Details:', shippingDetails);
    console.log('Total Price:', totalPrice);
    // Here you would call your backend to process the payment and create the order
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul className="checkout-items">
          {cart.map((item) => (
            <li key={item.code} className="checkout-item">
              <img src={item.image} alt={item.name} className="checkout-item-image" />
              <div>
                <h4>{item.name}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>

      <form className="checkout-form" onSubmit={handleCheckout}>
        <h3>Shipping Details</h3>
        <label>
          Full Name:
          <input type="text" name="name" value={shippingDetails.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={shippingDetails.address} onChange={handleChange} required />
        </label>
        <label>
          City:
          <input type="text" name="city" value={shippingDetails.city} onChange={handleChange} required />
        </label>
        <label>
          Postal Code:
          <input type="text" name="postalCode" value={shippingDetails.postalCode} onChange={handleChange} required />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={shippingDetails.country} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
