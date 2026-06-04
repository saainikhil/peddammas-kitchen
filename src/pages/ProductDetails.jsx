import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  // Scroll to top whenever the product ID changes (e.g. clicking related product)
  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1); // reset quantity to 1
  }, [id]);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="container product-details" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn primary" style={{ marginTop: '1rem' }}>Back to Menu</Link>
      </main>
    );
  }

  // Get 3 related products (excluding the current one)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddCart = () => {
    alert(`${qty} x ${product.name} added to cart!`);
  };

  return (
    <main className="container product-details">
      <div id="productDetails">
        <div className="detail-grid">
          <div className="img">
            <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
          </div>
          <div className="info">
            <h1 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif" }}>{product.name}</h1>
            <p className="price">₹{product.price}/kg</p>
            <p style={{ color: '#564439' }}>{product.description}</p>
            
            <h4>Ingredients</h4>
            <p>{product.ingredients}</p>
            
            <div className="qty" style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginTop: '1rem' }}>
              <button id="dec" className="btn" onClick={decrementQty}>-</button>
              <input
                id="qty"
                value={qty}
                readOnly
                style={{ width: '64px', padding: '.5rem', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center' }}
              />
              <button id="inc" className="btn" onClick={incrementQty}>+</button>
            </div>
            
            <div className="actions" style={{ marginTop: '1rem', display: 'flex', gap: '.6rem' }}>
              <button className="btn primary" id="addCart" onClick={handleAddCart}>
                Add to Cart
              </button>
              <a
                className="btn"
                href={`https://wa.me/918886880507?text=I%20want%20to%20order%20${qty}%20kg%20of%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Order
              </a>
            </div>
            
            <div className="reviews" style={{ marginTop: '1.2rem' }}>
              <h4>Customer Reviews</h4>
              <p>No reviews yet.</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section style={{ marginTop: '2rem' }}>
          <h3>Related Products</h3>
          <div className="product-grid" id="related">
            {relatedProducts.map((p) => (
              <article key={p.id} className="product-card">
                <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p className="price">₹{p.price}/kg</p>
                  <Link className="btn" to={`/product/${p.id}`}>
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
