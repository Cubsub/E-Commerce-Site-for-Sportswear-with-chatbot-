// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  sizes: { type: [String], required: true },
  color: { type: [String], required: true },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  description: { type: String },
  image: { type: String}, // Add this line for the image field
  code: { type: String, required: true, unique: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
