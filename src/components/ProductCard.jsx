import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showAdd = false }) => {
  const handleAdd = () => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}/kg</p>
        <p>{product.description}</p>
        <div className="product-actions">
          {showAdd ? (
            <>
              <button className="btn add" data-id={product.id} onClick={handleAdd}>Add</button>
              <Link className="btn" to={`/product/${product.id}`}>Details</Link>
            </>
          ) : (
            <Link className="btn" to={`/product/${product.id}`}>View Details</Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
