import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from './context/CartContext';



ReactDOM.render(
  <CartProvider>  {/* Wrap the App with CartProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartProvider>,
  document.getElementById('root')
);