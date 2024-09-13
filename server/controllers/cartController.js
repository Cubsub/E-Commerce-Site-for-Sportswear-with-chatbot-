const Cart = require('../models/Cart');
const Product = require('../models/product');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If the cart already exists, update the quantity of the item
      let itemIndex = cart.items.findIndex(item => item.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    } else {
      // If no cart exists, create a new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(item => item.productId != productId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get cart by user ID
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
