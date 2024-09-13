import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    sizes: []
  });

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    // Mock data for now
    setOrders([
      { id: '001', customer: 'John Doe', total: 120.99, status: 'Processing' },
      { id: '002', customer: 'Jane Smith', total: 89.99, status: 'Shipped' }
    ]);

    setProducts([
      { id: 'p001', name: 'Running Shoes', price: 79.99, stock: 10, sizes: ['M', 'L'] },
      { id: 'p002', name: 'Yoga Pants', price: 34.99, stock: 25, sizes: ['S', 'M', 'L'] }
    ]);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle size selection
  const handleSizeChange = (e) => {
    const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
    setNewProduct({ ...newProduct, sizes: selectedSizes });
  };

  // Add new product
  const addProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: `p${products.length + 1}` }]);
    setNewProduct({ name: '', price: '', stock: '', sizes: [] }); // Reset form
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="orders-section">
        <h3>Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <select value={order.status} onChange={(e) => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: e.target.value } : o))}>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="products-section">
        <h3>Manage Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock}) Sizes: {product.sizes.join(', ')}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>

        <h3>Add New Product</h3>
        <form onSubmit={addProduct}>
          <label>
            Product Name:
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
          </label>
          <label>
            Stock:
            <input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} required />
          </label>
          <label>
            Sizes:
            <select multiple={true} value={newProduct.sizes} onChange={handleSizeChange}>
              {availableSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
