const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../Middleware/authMiddleware');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); // Ensure Cart model is imported
const router = express.Router();

// @route POST /api/cart/add (with product name and size)
router.post('/add', authMiddleware, async (req, res) => {
  const { productName, quantity, size } = req.body;
  const userId = req.user.id; // Get the logged-in user ID from authMiddleware

  try {
    // Find the product in the database by name
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart (same product and size)
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === product._id.toString() && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if the item exists
    } else {
      // Add the new item to the cart
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        size: size || 'default size',
        quantity: quantity || 1,
      });
    }

    await cart.save();
    res.json({ message: `Added ${product.name} (Size: ${size}) to the cart!`, cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route POST /api/cart/increase (Increase item quantity)
router.post('/increase', authMiddleware, async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.productId.toString() === productId && item.size === size);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity += 1;
    await cart.save();

    res.json({ message: 'Quantity increased', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route POST /api/cart/decrease (Decrease item quantity)
router.post('/decrease', authMiddleware, async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.productId.toString() === productId && item.size === size);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      return res.status(400).json({ message: 'Quantity cannot be less than 1' });
    }

    await cart.save();
    res.json({ message: 'Quantity decreased', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route GET /api/cart (Get user's cart)
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id; // Get the logged-in user ID from authMiddleware

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route DELETE /api/cart/remove (Remove item from cart)
router.delete('/remove', authMiddleware, async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and remove the item with the matching productId and size
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId || item.size !== size
    );

    await cart.save();
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
