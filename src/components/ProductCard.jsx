import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const SPICE_COLORS = {
  'None': '#a8d5ba',
  'Mild': '#f9e07b',
  'Medium': '#f4a462',
  'Hot': '#e05c2e',
  'Very Hot': '#c0392b',
  'Mixed': '#9b59b6',
};

const BADGE_STYLES = {
  'Best Seller': { bg: '#FFF3CD', color: '#856404', border: '#FFECB5' },
  'New':         { bg: '#D1ECF1', color: '#0C5460', border: '#BEE5EB' },
  'Recommended': { bg: '#D4EDDA', color: '#155724', border: '#C3E6CB' },
  'Limited Stock': { bg: '#FFF3CD', color: '#856404', border: '#FFECB5' },
  'Out of Stock':  { bg: '#F8D7DA', color: '#721C24', border: '#F5C6CB' },
};

const StarRating = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="star-rating" aria-label={`Rating: ${rating} out of 5`}>
      {'★'.repeat(full)}
      {half ? '⯨' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('pk_favorites') || '[]');
    return favs.includes(product.id);
  });
  const [selectedWeight, setSelectedWeight] = useState(product.weights?.[0] || '500g');
  const [qty, setQty] = useState(1);
  const [showCompareTooltip, setShowCompareTooltip] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const isOutOfStock = product.availability === 'Out of Stock';
  const isLimited    = product.availability === 'Limited Stock';

  const handleToggleFav = (e) => {
    e.preventDefault();
    const favs = JSON.parse(localStorage.getItem('pk_favorites') || '[]');
    let updated;
    if (isFav) {
      updated = favs.filter(id => id !== product.id);
      showToast(`${product.name} removed from favourites`, 'info');
    } else {
      updated = [...favs, product.id];
      showToast(`${product.name} added to favourites ❤️`, 'success');
    }
    localStorage.setItem('pk_favorites', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.shortDescription, url: `${window.location.origin}/product/${product.id}` });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
      showToast('Product link copied!', 'success');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product, qty);
    showToast(`${product.name} added to cart 🛒`, 'success');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    navigate(`/checkout?buyNow=${product.id}&qty=${qty}`);
  };

  return (
    <article
      className={`product-card enriched-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}
      data-testid={`product-card-${product.id}`}
      aria-label={`${product.name}, ₹${product.price}`}
    >
      {/* Image with overlays */}
      <div className="card-img-wrapper">
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="card-main-img"
          />
        </Link>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="out-of-stock-overlay" data-testid={`oos-overlay-${product.id}`}>
            Out of Stock
          </div>
        )}

        {/* Badge row (top-left) */}
        <div className="card-badges-top">
          {product.badges
            .filter(b => b !== 'Out of Stock' && b !== 'Limited Stock')
            .slice(0, 2)
            .map(badge => (
              <span
                key={badge}
                className="product-badge"
                style={{ background: BADGE_STYLES[badge]?.bg, color: BADGE_STYLES[badge]?.color, borderColor: BADGE_STYLES[badge]?.border }}
                data-testid={`badge-${badge.toLowerCase().replace(' ', '-')}-${product.id}`}
              >
                {badge}
              </span>
            ))
          }
          {isLimited && (
            <span className="product-badge limited-badge" data-testid={`badge-limited-${product.id}`}>⚡ Limited</span>
          )}
        </div>

        {/* Action Icons (top-right) */}
        <div className="card-action-icons">
          {/* Favourite */}
          <button
            className={`icon-btn fav-btn ${isFav ? 'fav-active' : ''}`}
            onClick={handleToggleFav}
            aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={isFav}
            data-testid={`fav-btn-${product.id}`}
          >
            {isFav ? '❤️' : '🤍'}
          </button>

          {/* Share */}
          <div className="tooltip-wrapper">
            <button
              className="icon-btn share-btn"
              onClick={handleShare}
              aria-label="Share product"
              data-testid={`share-btn-${product.id}`}
            >
              📤
            </button>
            {showShareTooltip && <span className="tooltip">Link copied!</span>}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="product-body enriched-body">
        {/* Category + Veg Badge */}
        <div className="card-meta-row">
          <span className="category-badge" data-testid={`category-${product.id}`}>{product.category}</span>
          <span className={`veg-indicator ${product.isVeg ? 'veg' : 'non-veg'}`} title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'} aria-label={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
            <span className="veg-dot" />
          </span>
        </div>

        {/* Product Name */}
        <h3 className="product-card-name">
          <Link to={`/product/${product.id}`} data-testid={`product-name-link-${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="product-short-desc">{product.shortDescription}</p>

        {/* Rating */}
        <div className="card-rating-row" data-testid={`rating-row-${product.id}`}>
          <StarRating rating={product.rating} />
          <span className="rating-value">{product.rating}</span>
          <span className="review-count" data-testid={`review-count-${product.id}`}>({product.reviewCount} reviews)</span>
        </div>

        {/* Spice Level */}
        <div className="spice-row" data-testid={`spice-${product.id}`}>
          <span className="spice-label">Spice:</span>
          <span
            className="spice-badge"
            style={{ background: SPICE_COLORS[product.spiceLevel] + '33', color: SPICE_COLORS[product.spiceLevel], border: `1px solid ${SPICE_COLORS[product.spiceLevel]}44` }}
          >
            {product.spiceLevel}
          </span>
        </div>

        {/* Weight Selector */}
        {product.weights && product.weights.length > 1 && (
          <div className="weight-selector" data-testid={`weight-selector-${product.id}`}>
            {product.weights.map(w => (
              <button
                key={w}
                className={`weight-btn ${selectedWeight === w ? 'selected' : ''}`}
                onClick={() => setSelectedWeight(w)}
                aria-pressed={selectedWeight === w}
                data-testid={`weight-${w}-${product.id}`}
              >
                {w}
              </button>
            ))}
          </div>
        )}

        {/* Price Row */}
        <div className="card-price-row">
          <span className="card-price" data-testid={`price-${product.id}`}>₹{product.price}</span>
          <span className="original-price" data-testid={`original-price-${product.id}`}>₹{product.originalPrice}</span>
          <span className="discount-badge" data-testid={`discount-${product.id}`}>{product.discount}% OFF</span>
        </div>

        {/* Quantity Selector */}
        <div className="card-qty-row">
          <span className="qty-label">Qty:</span>
          <div className="card-qty-controls">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" data-testid={`card-qty-dec-${product.id}`} disabled={qty <= 1}>−</button>
            <span className="qty-display" data-testid={`card-qty-${product.id}`}>{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)} aria-label="Increase quantity" data-testid={`card-qty-inc-${product.id}`}>+</button>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="delivery-row" data-testid={`delivery-${product.id}`}>
          🚚 <span>Est. delivery: {product.estimatedDelivery}</span>
        </div>

        {/* Action Buttons */}
        <div className="card-buttons">
          <button
            className="btn buy-now-btn"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            aria-disabled={isOutOfStock}
            data-testid={`buy-now-${product.id}`}
          >
            Buy Now
          </button>
          <button
            className="btn add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-disabled={isOutOfStock}
            data-testid={`add-to-cart-${product.id}`}
          >
            🛒 Add to Cart
          </button>
        </div>

        {/* Compare Button (UI only) */}
        <div className="compare-row">
          <div className="tooltip-wrapper">
            <button
              className="btn compare-btn"
              onMouseEnter={() => setShowCompareTooltip(true)}
              onMouseLeave={() => setShowCompareTooltip(false)}
              onClick={() => showToast('Compare feature coming soon!', 'info')}
              aria-label="Compare product"
              data-testid={`compare-btn-${product.id}`}
            >
              ⚖️ Compare
            </button>
            {showCompareTooltip && (
              <span className="tooltip" role="tooltip" data-testid={`compare-tooltip-${product.id}`}>
                Compare feature coming soon
              </span>
            )}
          </div>
          <Link to={`/product/${product.id}`} className="details-link" data-testid={`details-link-${product.id}`}>
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
