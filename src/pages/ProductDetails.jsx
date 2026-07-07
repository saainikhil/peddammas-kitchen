import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const SPICE_COLORS = {
  'None': '#a8d5ba',
  'Mild': '#f9e07b',
  'Medium': '#f4a462',
  'Hot': '#e05c2e',
  'Very Hot': '#c0392b',
  'Mixed': '#9b59b6',
};

const StarRating = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="star-rating" aria-label={`Rating: ${rating} out of 5`} style={{ fontSize: '1.2rem', color: '#f4a817', letterSpacing: '2px' }}>
      {'★'.repeat(full)}{half ? '⯨' : ''}{'☆'.repeat(empty)}
    </span>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    if (product?.weights?.length > 0) setSelectedWeight(product.weights[0]);
  }, [id, product]);

  if (!product) {
    return (
      <main className="container product-details" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn primary" style={{ marginTop: '1rem' }}>Back to Menu</Link>
      </main>
    );
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const isOutOfStock = product.availability === 'Out of Stock';

  const handleAddCart = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    showToast(`${qty} × ${product.name} added to cart 🛒`, 'success');
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    navigate(`/checkout?buyNow=${product.id}&qty=${qty}`);
  };

  return (
    <main className="container product-details" style={{ paddingTop: '1rem' }}>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Order Food', to: '/products' }, { label: product.name }]} />

      <div id="productDetails">
        <div className="detail-grid">
          {/* Product Image */}
          <div className="img" style={{ position: 'relative' }}>
            <img src={product.image} alt={product.name} loading="lazy" decoding="async" style={{ width: '100%', borderRadius: '14px', boxShadow: '0 12px 36px rgba(92,64,51,0.1)' }} />
            {isOutOfStock && (
              <div className="out-of-stock-overlay" style={{ borderRadius: '14px' }} data-testid="oos-overlay-detail">Out of Stock</div>
            )}
            {/* Badges */}
            <div className="card-badges-top" style={{ position: 'absolute', top: '12px', left: '12px' }}>
              {product.badges.filter(b => b !== 'Out of Stock').map(badge => (
                <span key={badge} className="product-badge" style={{ background: '#fff8f0', color: 'var(--maroon)', border: '1px solid #eadcc9' }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="info">
            {/* Category + Veg */}
            <div className="card-meta-row" style={{ marginBottom: '.6rem' }}>
              <span className="category-badge">{product.category}</span>
              <span className={`veg-indicator ${product.isVeg ? 'veg' : 'non-veg'}`} title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
                <span className="veg-dot" />
              </span>
              {product.availability === 'Limited Stock' && (
                <span className="limited-badge product-badge" style={{ background: '#fff3cd', color: '#856404' }}>⚡ Limited Stock</span>
              )}
            </div>

            <h1 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif", color: 'var(--maroon)' }} data-testid="product-detail-name">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="card-rating-row" style={{ marginBottom: '.6rem' }}>
              <StarRating rating={product.rating} />
              <span className="rating-value" style={{ fontWeight: 700 }}>{product.rating}</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>

            {/* Spice */}
            <div className="spice-row" style={{ marginBottom: '.8rem' }}>
              <span className="spice-label">Spice Level:</span>
              <span className="spice-badge" style={{ background: SPICE_COLORS[product.spiceLevel] + '33', color: SPICE_COLORS[product.spiceLevel], border: `1px solid ${SPICE_COLORS[product.spiceLevel]}44` }}>
                {product.spiceLevel}
              </span>
            </div>

            {/* Price */}
            <div className="card-price-row" style={{ marginBottom: '1rem' }}>
              <span className="card-price" style={{ fontSize: '1.6rem' }}>₹{product.price}</span>
              <span className="original-price" style={{ fontSize: '1rem' }}>₹{product.originalPrice}</span>
              <span className="discount-badge">{product.discount}% OFF</span>
            </div>

            {/* Delivery */}
            <div className="delivery-row" style={{ marginBottom: '1rem', fontSize: '.88rem' }}>
              🚚 Est. delivery: <strong>{product.estimatedDelivery}</strong>
            </div>

            {/* Weight Selector */}
            {product.weights && product.weights.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--brown)', marginBottom: '.4rem', display: 'block', fontSize: '.9rem' }}>Weight</label>
                <div className="weight-selector" data-testid="detail-weight-selector">
                  {product.weights.map(w => (
                    <button key={w} className={`weight-btn ${selectedWeight === w ? 'selected' : ''}`} onClick={() => setSelectedWeight(w)} data-testid={`detail-weight-${w}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="qty" style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--brown)', fontSize: '.9rem' }}>Quantity:</span>
              <div className="card-qty-controls" data-testid="detail-qty-controls">
                <button id="dec" className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1} data-testid="detail-qty-dec">−</button>
                <span className="qty-display" id="qty" data-testid="detail-qty-value">{qty}</span>
                <button id="inc" className="qty-btn" onClick={() => setQty(q => q + 1)} data-testid="detail-qty-inc">+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="actions" style={{ display: 'flex', gap: '.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                className="buy-now-detail-btn"
                id="buyNowDetail"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                data-testid="detail-buy-now"
                style={{ flex: 1 }}
              >
                Buy Now
              </button>
              <button
                className="btn primary"
                id="addCart"
                onClick={handleAddCart}
                disabled={isOutOfStock}
                data-testid="detail-add-cart"
                style={{ flex: 1, opacity: isOutOfStock ? .5 : 1 }}
              >
                🛒 Add to Cart
              </button>
              <a
                className="btn"
                href={`https://wa.me/919876543210?text=I%20want%20to%20order%20${qty}%20of%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noreferrer"
                data-testid="detail-whatsapp-btn"
              >
                📱 WhatsApp
              </a>
            </div>

            {isOutOfStock && (
              <div style={{ background: '#f8d7da', color: '#721c24', padding: '.7rem 1rem', borderRadius: '8px', fontWeight: 600, fontSize: '.88rem' }} role="alert" data-testid="out-of-stock-alert">
                This product is currently out of stock. Check back soon!
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Description / Ingredients / Reviews */}
        <div style={{ marginTop: '2rem', background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 8px 30px rgba(92,64,51,0.06)' }}>
          <div role="tablist" aria-label="Product information tabs" style={{ display: 'flex', gap: '.5rem', borderBottom: '2px solid #f0e9de', marginBottom: '1.2rem' }}>
            {['description', 'ingredients', 'reviews'].map(tab => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
                data-testid={`tab-${tab}`}
                style={{ borderRadius: '8px 8px 0 0', borderBottom: 'none' }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div data-testid="tab-content-description">
              <p style={{ color: '#5b463e', lineHeight: 1.7 }}>{product.description}</p>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <div data-testid="tab-content-ingredients">
              <h4 style={{ marginTop: 0, color: 'var(--maroon)' }}>Ingredients</h4>
              <p style={{ color: '#5b463e' }}>{product.ingredients}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div data-testid="tab-content-reviews">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: '#faf6f0', borderRadius: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--maroon)' }}>{product.rating}</div>
                  <StarRating rating={product.rating} />
                  <div style={{ fontSize: '.82rem', color: '#9e8a7e', marginTop: '.25rem' }}>{product.reviewCount} reviews</div>
                </div>
              </div>
              <p style={{ color: '#9e8a7e', textAlign: 'center', padding: '1rem' }}>Customer reviews coming soon. Be the first to review!</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '2rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--maroon)' }}>More {product.category}</h3>
            <div className="product-grid" id="related" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {relatedProducts.map((p) => (
                <article key={p.id} className="product-card" data-testid={`related-card-${p.id}`}>
                  <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
                  <div className="product-body">
                    <h3>{p.name}</h3>
                    <div className="card-price-row">
                      <span className="card-price">₹{p.price}</span>
                      <span className="original-price">₹{p.originalPrice}</span>
                    </div>
                    <Link className="btn primary" to={`/product/${p.id}`} style={{ marginTop: '.5rem', display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
