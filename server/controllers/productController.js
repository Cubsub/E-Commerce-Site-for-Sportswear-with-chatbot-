const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new product (Admin only)
exports.addProduct = async (req, res) => {
  const { name, category, sizes, color, price, gender, description, code } = req.body;

  try {
    const newProduct = new Product({ name, category, sizes, color, price, gender, description, code });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
