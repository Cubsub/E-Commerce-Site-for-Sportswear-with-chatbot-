import React, { useState } from 'react';
import './Chatbot.css';
import nlp from 'compromise'; 
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [pendingProduct, setPendingProduct] = useState(null); // Track product awaiting size confirmation
  const [pendingSize, setPendingSize] = useState(false);
  const navigate = useNavigate(); 

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addItemToCart = async (productName, size) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, quantity: 1, size })
      });

      const data = await response.json();
      if (response.ok) {
        return `I've added ${productName} (Size: ${size}) to your cart!`;
      } else {
        return `There was an issue adding ${productName} to your cart: ${data.message}`;
      }
    } catch (error) {
      return "I'm having trouble adding the item to your cart right now.";
    }
  };

  const searchProducts = async (query) => {
    try {
      const response = await fetch(`/api/products/search?q=${query}`);
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        const productList = data.products.map(product => `${product.name} (Price: $${product.price})`).join(', ');
        return `Here are the products matching "${query}": ${productList}`;
      } else {
        return `I couldn't find any products matching "${query}".`;
      }
    } catch (error) {
      return "I'm having trouble searching for products right now.";
    }
  };

  const processMessage = async (message) => {
    const doc = nlp(message);
    let response = "I'm not sure I understand. Can you rephrase that?";

    // Handle "Add to cart" requests
    if (doc.match('add [*] to cart').found) {
      const productName = doc.match('add [*] to cart').out('text').replace('add', '').replace('to cart', '').trim();
      setPendingProduct(productName);
      setPendingSize(true);
      return `What size would you like for ${productName}? (Small, Medium, Large)`;
    }

    // Handle size response if awaiting confirmation
    else if (pendingSize) {
      const size = doc.text().trim();
      if (['small', 'medium', 'large'].includes(size.toLowerCase())) {
        response = await addItemToCart(pendingProduct, size);
        setPendingProduct(null);
        setPendingSize(false);
      } else {
        response = "Please provide a valid size (Small, Medium, Large).";
      }
    }

    // Handle product search queries
    else if (doc.has('show me')) {
      const productQuery = doc.match('show me [.*]').out('text').replace('show me', '').trim();
      response = await searchProducts(productQuery);
    }

    // Handle navigation requests
    else if (doc.has('go to')) {
      const pageQuery = doc.match('go to [.*]').out('text').replace('go to', '').trim();
      if (pageQuery.toLowerCase().includes('men')) {
        navigate('/men');
        response = "Taking you to the Men's section.";
      } else if (pageQuery.toLowerCase().includes('women')) {
        navigate('/women');
        response = "Taking you to the Women's section.";
      } else if (pageQuery.toLowerCase().includes('all products')) {
        navigate('/all-products');
        response = "Taking you to the All Products page.";
      } else {
        response = "Sorry, I can't navigate to that page.";
      }
    }

    return response;
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };

      const botResponse = { text: await processMessage(input), sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <div className="chatbot-header" onClick={toggleChat}>
        {isOpen ? "Chat with us!" : "Need help? Chat with us!"}
      </div>
      {isOpen && (
        <div className="chatbot-body">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
