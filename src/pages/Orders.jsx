import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatDate, getStatusBadgeClass } from '../utils/orderUtils';
import Breadcrumb from '../components/Breadcrumb';

const PAYMENT_LABELS = {
  cod: 'Cash on Delivery',
  upi: 'UPI',
  credit: 'Credit Card',
  debit: 'Debit Card',
  netbanking: 'Net Banking',
};

const Orders = () => {
  const [orders] = useLocalStorage('pk_orders', []);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

  if (orders.length === 0) {
    return (
      <main className="container orders-page" data-testid="orders-page">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Orders' }]} />
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state" data-testid="empty-orders">
          <div className="empty-state-icon">📦</div>
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link to="/products" className="btn primary" data-testid="shop-now-btn">Shop Now</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container orders-page" data-testid="orders-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Orders' }]} />
      <h1 className="page-title">My Orders <span className="order-count-text">({orders.length} orders)</span></h1>

      <div className="orders-list" data-testid="orders-list">
        {orders.map((order) => {
          const isExpanded = expandedId === order.id;
          return (
            <div key={order.id} className="order-card" data-testid={`order-${order.id}`}>
              {/* Order Header */}
              <div className="order-card-header" onClick={() => toggleExpand(order.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleExpand(order.id)} aria-expanded={isExpanded}>
                <div className="order-header-left">
                  <div className="order-id">
                    <span className="order-id-label">Order ID:</span>
                    <span className="order-id-value" data-testid="order-id">{order.id}</span>
                  </div>
                  <div className="order-date" data-testid="order-date">
                    📅 {formatDate(order.date)}
                  </div>
                  <div className="order-items-preview">
                    {order.items.slice(0, 2).map(item => item.name).join(', ')}
                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                  </div>
                </div>
                <div className="order-header-right">
                  <span className="order-total-amount">₹{order.total?.toLocaleString('en-IN')}</span>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`} data-testid={`order-status-${order.id}`}>
                    {order.status}
                  </span>
                  <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Order Details (expanded) */}
              {isExpanded && (
                <div className="order-card-body" data-testid={`order-body-${order.id}`}>
                  {/* Items */}
                  <div className="order-items-section">
                    <h4>Items Ordered</h4>
                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row" data-testid={`order-item-${idx}`}>
                          <img src={item.image} alt={item.name} className="order-item-img" />
                          <div className="order-item-info">
                            <span className="order-item-name">{item.name}</span>
                            <span className="order-item-qty">Qty: {item.quantity}</span>
                          </div>
                          <span className="order-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="order-price-breakdown">
                    <div className="summary-row"><span>Subtotal</span><span>₹{order.subtotal?.toLocaleString('en-IN')}</span></div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span>{order.deliveryCharge === 0 ? <span className="free-delivery">FREE</span> : `₹${order.deliveryCharge}`}</span>
                    </div>
                    <div className="summary-divider" />
                    <div className="summary-row summary-total"><span>Total</span><span>₹{order.total?.toLocaleString('en-IN')}</span></div>
                  </div>

                  {/* Address & Payment */}
                  <div className="order-meta-grid">
                    {order.address && (
                      <div className="order-meta-card" data-testid={`order-address-${order.id}`}>
                        <h4>📍 Delivery Address</h4>
                        <p><strong>{order.address.fullName}</strong> — {order.address.mobile}</p>
                        <p>{order.address.houseNo}, {order.address.street}{order.address.landmark ? `, Near ${order.address.landmark}` : ''}, {order.address.city}, {order.address.state} – {order.address.pincode}</p>
                        <span className="address-type-badge">{order.address.type}</span>
                      </div>
                    )}
                    <div className="order-meta-card">
                      <h4>💳 Payment</h4>
                      <p>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</p>
                      <h4>🚚 Estimated Delivery</h4>
                      <p>{order.estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="order-status-timeline">
                    {['Ordered', 'Preparing', 'Out for Delivery', 'Delivered'].map((s, idx, arr) => {
                      const statusOrder = arr.indexOf(order.status);
                      const isActive = idx <= statusOrder;
                      return (
                        <React.Fragment key={s}>
                          <div className={`timeline-step-small ${isActive ? 'active' : ''}`}>
                            <div className="timeline-dot-small">{isActive ? '✓' : idx + 1}</div>
                            <span>{s}</span>
                          </div>
                          {idx < arr.length - 1 && <div className={`timeline-connector-small ${isActive && idx < statusOrder ? 'active' : ''}`} />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Orders;
