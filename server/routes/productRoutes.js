const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct } = require('../controllers/productController');
const Product = require('../models/Product');

// @route GET /api/products
router.get('/', getAllProducts);

// @route GET /api/products/:id
router.get('/:id', getProductById);

// @route POST /api/products (Admin only)
router.post('/', addProduct);

// GET products by gender
router.get('/gender/:gender', async (req, res) => {
  const { gender } = req.params;
  try {
    console.log(`Fetching products for gender: ${gender}`); // Add this log for debugging

    // Find products based on gender
    const products = await Product.find({ gender: gender });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this gender' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message); // Log the actual error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/products - Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Product Search - GET /api/products/search?q=keyword
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    // Perform case-insensitive search using regex
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },  // Search by name
        { description: { $regex: query, $options: 'i' } }  // Search by description
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found matching "${query}"` });
    }

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
