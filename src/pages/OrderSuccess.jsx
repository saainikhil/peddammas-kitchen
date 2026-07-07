import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'PKO-XXXXXXXX-0000';
  const estimatedDelivery = searchParams.get('delivery') || '3-4 days';

  // Retrieve order details from localStorage for display
  const orders = JSON.parse(localStorage.getItem('pk_orders') || '[]');
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="container order-success-page" data-testid="order-success-page">
      <div className="success-card">
        {/* Green Tick Animation */}
        <div className="success-tick-container" data-testid="success-tick">
          <svg className="success-tick" viewBox="0 0 52 52" aria-hidden="true">
            <circle className="success-tick-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="success-tick-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h1 className="success-title" data-testid="success-heading">Order Placed Successfully! 🎉</h1>
        <p className="success-subtitle">
          Thank you for ordering from <strong>Peddamma's Kitchen</strong>.
          Your homemade Andhra food is being prepared with love!
        </p>

        {/* Order Details */}
        <div className="order-details-grid" data-testid="order-details">
          <div className="order-detail-item">
            <span className="detail-label">Order ID</span>
            <span className="detail-value order-id-value" data-testid="success-order-id">{orderId}</span>
          </div>
          <div className="order-detail-item">
            <span className="detail-label">Estimated Delivery</span>
            <span className="detail-value" data-testid="success-delivery">{estimatedDelivery}</span>
          </div>
          {order?.address && (
            <div className="order-detail-item full">
              <span className="detail-label">Delivery Address</span>
              <span className="detail-value" data-testid="success-address">
                {order.address.fullName}, {order.address.houseNo}, {order.address.street}, {order.address.city} – {order.address.pincode}
              </span>
            </div>
          )}
          {order?.paymentMethod && (
            <div className="order-detail-item">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value" data-testid="success-payment">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            </div>
          )}
          {order?.total && (
            <div className="order-detail-item">
              <span className="detail-label">Amount</span>
              <span className="detail-value" data-testid="success-amount">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Ordered Items */}
        {order?.items && order.items.length > 0 && (
          <div className="success-items" data-testid="success-items">
            <h3 className="success-items-title">Items Ordered</h3>
            <div className="success-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="success-item-row">
                  <img src={item.image} alt={item.name} className="success-item-img" />
                  <div className="success-item-info">
                    <span className="success-item-name">{item.name}</span>
                    <span className="success-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="success-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="order-timeline" data-testid="order-timeline">
          <div className="timeline-step active">
            <span className="timeline-dot">✓</span>
            <span>Order Placed</span>
          </div>
          <div className="timeline-connector" />
          <div className="timeline-step">
            <span className="timeline-dot">2</span>
            <span>Preparing</span>
          </div>
          <div className="timeline-connector" />
          <div className="timeline-step">
            <span className="timeline-dot">3</span>
            <span>Out for Delivery</span>
          </div>
          <div className="timeline-connector" />
          <div className="timeline-step">
            <span className="timeline-dot">4</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="success-actions" data-testid="success-actions">
          <Link to="/products" className="btn" data-testid="continue-shopping-success">
            ← Continue Shopping
          </Link>
          <Link to="/orders" className="btn primary" data-testid="go-to-orders-btn">
            📦 Go to My Orders
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
