import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getDeliveryCharge } from '../utils/orderUtils';
import Breadcrumb from '../components/Breadcrumb';

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  const deliveryCharge = getDeliveryCharge(cartTotal);
  const grandTotal = cartTotal + deliveryCharge;

  const handleRemove = (product) => {
    setRemovingId(product.id);
    setTimeout(() => {
      removeFromCart(product.id);
      setRemovingId(null);
      showToast(`${product.name} removed from cart`, 'info');
    }, 300);
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  if (cart.length === 0) {
    return (
      <main className="container cart-page" data-testid="cart-page">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        <div className="empty-state" data-testid="empty-cart">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Browse our delicious homemade food!</p>
          <Link to="/products" className="btn primary" data-testid="start-shopping-btn">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container cart-page" data-testid="cart-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="page-title">Your Cart <span className="cart-count-text">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span></h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items" data-testid="cart-items-list">
          {cart.map((item) => {
            const { product, quantity } = item;
            const isRemoving = removingId === product.id;
            return (
              <div
                key={product.id}
                className={`cart-item ${isRemoving ? 'cart-item-removing' : ''}`}
                data-testid={`cart-item-${product.id}`}
              >
                <div className="cart-item-img">
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <div>
                      <span className="cart-item-category">{product.category}</span>
                      <h3 className="cart-item-name">{product.name}</h3>
                      <span className={`veg-badge ${product.isVeg ? 'veg' : 'non-veg'}`} title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
                        {product.isVeg ? '🟢' : '🔴'} {product.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => handleRemove(product)}
                      aria-label={`Remove ${product.name} from cart`}
                      data-testid={`remove-item-${product.id}`}
                    >
                      🗑
                    </button>
                  </div>

                  <div className="cart-item-footer">
                    <div className="cart-qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        data-testid={`qty-decrease-${product.id}`}
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="qty-display" data-testid={`qty-value-${product.id}`}>{quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        data-testid={`qty-increase-${product.id}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-price">
                      <span className="price-per-unit">₹{product.price} × {quantity}</span>
                      <span className="price-total" data-testid={`item-total-${product.id}`}>
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="cart-actions-row">
            <Link to="/products" className="btn continue-shopping-btn" data-testid="continue-shopping-btn">
              ← Continue Shopping
            </Link>
            <button className="btn clear-cart-btn" onClick={handleClearCart} data-testid="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="cart-summary-box" data-testid="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span data-testid="cart-subtotal">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span data-testid="delivery-charge">
              {deliveryCharge === 0
                ? <span className="free-delivery">FREE</span>
                : `₹${deliveryCharge}`}
            </span>
          </div>
          {deliveryCharge > 0 && (
            <div className="free-delivery-notice">
              Add ₹{500 - cartTotal} more for FREE delivery
            </div>
          )}
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total Amount</span>
            <span data-testid="cart-grand-total">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <button
            className="btn primary checkout-btn"
            onClick={() => navigate('/checkout')}
            data-testid="proceed-to-checkout-btn"
          >
            Proceed to Checkout →
          </button>
          <div className="secure-badge">
            🔒 Secure Checkout
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
