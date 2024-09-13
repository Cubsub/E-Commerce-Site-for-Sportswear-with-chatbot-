// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Change from userId to user
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true }, // Store product name
      price: { type: Number, required: true }, // Store product price
      size: { type: String, required: true }, // Store selected size
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
