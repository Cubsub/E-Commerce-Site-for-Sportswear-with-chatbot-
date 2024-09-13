import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Assuming you have a fetchProduct API that gets a product by ID
const fetchProduct = async (productId) => {
  const response = await fetch(`/api/products/${productId}`);
  const data = await response.json();
  return data;
};

const fetchRelatedProducts = async (category) => {
  const response = await fetch(`/api/products/category/${category}`);
  const data = await response.json();
  return data;
};

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProduct(productId);
      setProduct(productData);

      // Fetch related products based on the category
      const relatedProductsData = await fetchRelatedProducts(productData.category);
      setRelatedProducts(relatedProductsData);
    };

    loadProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Available Sizes: {product.sizes.join(', ')}</p>
      <p>Colors: {product.color.join(', ')}</p>

      <h2>Related Products</h2>
      <div className="related-products">
        {relatedProducts.map((relatedProduct) => (
          <div key={relatedProduct.id}>
            <Link to={`/product/${relatedProduct.id}`}>
              <h3>{relatedProduct.name}</h3>
              <img src={relatedProduct.image} alt={relatedProduct.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
