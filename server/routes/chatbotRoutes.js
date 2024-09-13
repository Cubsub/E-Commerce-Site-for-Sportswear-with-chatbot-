const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you have a Product model

// Chatbot route to handle product search
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    // Perform case-insensitive search using regex
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for "${query}"` });
    }

    // Respond with custom chatbot response format
    res.json({
      response: `Here are the products matching "${query}":`,
      products: products.map(p => ({
        name: p.name,
        price: p.price,
        sizes: p.sizes,
        colors: p.colors,
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Chatbot route to handle navigation requests
router.post('/navigate', (req, res) => {
  const { page } = req.body;
  if (page === 'men') {
    return res.json({ navigateTo: '/men' });
  } else if (page === 'women') {
    return res.json({ navigateTo: '/women' });
  } else if (page === 'products') {
    return res.json({ navigateTo: '/products' });
  } else {
    return res.status(404).json({ message: 'Page not found' });
  }
});

module.exports = router;
