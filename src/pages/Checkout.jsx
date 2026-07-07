import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { validateAddressForm } from '../utils/validators';
import { generateOrderId, getEstimatedDelivery, getDeliveryCharge } from '../utils/orderUtils';
import { products as allProducts } from '../data/products';
import Breadcrumb from '../components/Breadcrumb';

const STEPS = ['Address', 'Payment', 'Summary'];
const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'credit', label: 'Credit Card', icon: '💳' },
  { id: 'debit', label: 'Debit Card', icon: '🏧' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
];

const PAYMENT_INFO = {
  cod: 'Pay with cash when your order is delivered. Keep the exact amount ready for a smooth handover.',
  upi: 'Choose UPI and pay securely with your preferred app when prompted after order placement.',
  credit: 'Select credit card and provide your card details securely after checkout to complete payment.',
  debit: 'Use debit card payment after checkout to pay securely with your bank card.',
  netbanking: 'Pay using net banking after confirming the order through the payment prompt.',
};

const STATES = [
  'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala',
  'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan', 'West Bengal',
  'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Punjab', 'Other'
];

const emptyAddress = {
  fullName: '', mobile: '', houseNo: '', street: '',
  landmark: '', city: '', state: '', pincode: '', type: 'Home'
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState(0);
  const [addresses, setAddresses] = useLocalStorage('pk_addresses', []);
  const [orders, setOrders] = useLocalStorage('pk_orders', []);
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('pk_addresses') || '[]');
    const def = saved.find(a => a.isDefault);
    return def ? def.id : (saved[0]?.id || null);
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addressErrors, setAddressErrors] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine items to checkout — could be "buy now" or full cart
  const params = new URLSearchParams(location.search);
  const buyNowId = params.get('buyNow');
  const buyNowQty = parseInt(params.get('qty') || '1', 10);

  let checkoutItems = cart;
  if (buyNowId) {
    const p = allProducts.find(x => x.id === buyNowId);
    if (p) checkoutItems = [{ product: p, quantity: buyNowQty }];
  }

  const subtotal = checkoutItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const deliveryCharge = getDeliveryCharge(subtotal);
  const grandTotal = subtotal + deliveryCharge;

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  // ---- Address Form Handlers ----
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
    if (addressErrors[name]) {
      setAddressErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveAddress = () => {
    const errors = validateAddressForm(addressForm);
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    if (editingAddress) {
      setAddresses(prev => prev.map(a => a.id === editingAddress.id ? { ...addressForm, id: editingAddress.id, isDefault: editingAddress.isDefault } : a));
      showToast('Address updated!', 'success');
    } else {
      const newAddr = { ...addressForm, id: Date.now().toString(), isDefault: addresses.length === 0 };
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      showToast('Address saved!', 'success');
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm(emptyAddress);
    setAddressErrors({});
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm(addr);
    setShowAddressForm(true);
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm(emptyAddress);
    setAddressErrors({});
  };

  // ---- Step Navigation ----
  const handleNextStep = () => {
    if (step === 0) {
      if (!selectedAddressId) {
        showToast('Please select or add a delivery address', 'error');
        return;
      }
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- Order Confirm ----
  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      showToast('No address selected', 'error');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const estimatedDelivery = getEstimatedDelivery();
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: checkoutItems.map(i => ({ productId: i.product.id, name: i.product.name, image: i.product.image, price: i.product.price, quantity: i.quantity })),
        subtotal,
        deliveryCharge,
        total: grandTotal,
        address: selectedAddress,
        paymentMethod: selectedPayment,
        status: 'Ordered',
        estimatedDelivery,
      };
      setOrders(prev => [newOrder, ...prev]);

      // Only clear cart if not buy-now
      if (!buyNowId) clearCart();

      setIsSubmitting(false);
      navigate(`/order-success?orderId=${orderId}&delivery=${encodeURIComponent(estimatedDelivery)}`);
    }, 1500);
  };

  if (checkoutItems.length === 0 && !buyNowId) {
    return (
      <main className="container checkout-page">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Nothing to checkout</h2>
          <p>Your cart is empty. Add some items first!</p>
          <a href="/products" className="btn primary">Browse Products</a>
        </div>
      </main>
    );
  }

  return (
    <main className="container checkout-page" data-testid="checkout-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="page-title">Checkout</h1>

      {/* Step Progress Bar */}
      <div className="step-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemax={3} data-testid="checkout-progress">
        {STEPS.map((s, idx) => (
          <div key={s} className={`step-item ${idx <= step ? 'active' : ''} ${idx < step ? 'completed' : ''}`} data-testid={`step-${idx}`}>
            <div className="step-circle">{idx < step ? '✓' : idx + 1}</div>
            <span className="step-label">{s}</span>
            {idx < STEPS.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">

          {/* ===== STEP 0: Address ===== */}
          {step === 0 && (
            <section className="checkout-section" data-testid="step-address">
              <h2 className="section-title">📍 Delivery Address</h2>

              {addresses.length === 0 && !showAddressForm && (
                <div className="no-address-state" data-testid="no-address-state">
                  <div className="empty-state-icon">📭</div>
                  <p>No address found. Please add a delivery address.</p>
                  <button
                    className="btn primary"
                    onClick={() => setShowAddressForm(true)}
                    data-testid="add-address-btn"
                  >
                    + Add Address
                  </button>
                </div>
              )}

              {addresses.length > 0 && !showAddressForm && (
                <>
                  <div className="address-list" data-testid="address-list">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`address-card-select ${selectedAddressId === addr.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAddressId(addr.id)}
                        role="radio"
                        aria-checked={selectedAddressId === addr.id}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedAddressId(addr.id)}
                        data-testid={`address-option-${addr.id}`}
                      >
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          id={`addr-${addr.id}`}
                          className="address-radio"
                        />
                        <div className="address-card-body">
                          <div className="address-card-top">
                            <span className="address-type-badge">{addr.type}</span>
                            {addr.isDefault && <span className="default-badge">Default</span>}
                          </div>
                          <strong>{addr.fullName}</strong>
                          <p className="address-text">{addr.houseNo}, {addr.street}{addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city}, {addr.state} – {addr.pincode}</p>
                          <p className="address-mobile">📞 {addr.mobile}</p>
                          <button className="btn edit-addr-btn" onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }} data-testid={`edit-address-${addr.id}`}>Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn add-new-addr-btn"
                    onClick={() => setShowAddressForm(true)}
                    data-testid="add-new-address-btn"
                  >
                    + Add New Address
                  </button>
                </>
              )}

              {/* Address Form */}
              {showAddressForm && (
                <div className="address-form-card" data-testid="address-form">
                  <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                  <div className="addr-form-grid">
                    {[
                      { name: 'fullName', label: 'Full Name *', type: 'text', placeholder: 'Enter full name' },
                      { name: 'mobile', label: 'Mobile Number *', type: 'tel', placeholder: '10-digit mobile' },
                      { name: 'houseNo', label: 'House / Flat No. *', type: 'text', placeholder: 'e.g. Flat 2B' },
                      { name: 'street', label: 'Street / Area *', type: 'text', placeholder: 'e.g. MG Road' },
                      { name: 'landmark', label: 'Landmark', type: 'text', placeholder: 'Near temple, school...' },
                      { name: 'city', label: 'City *', type: 'text', placeholder: 'e.g. Anantapur' },
                      { name: 'pincode', label: 'Pincode *', type: 'text', placeholder: '6-digit pincode', maxLength: 6 },
                    ].map(({ name, label, type, placeholder, maxLength }) => (
                      <div key={name} className={`form-group ${name === 'street' || name === 'landmark' ? 'full-width' : ''}`}>
                        <label htmlFor={`addr-input-${name}`}>{label}</label>
                        <input
                          id={`addr-input-${name}`}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          value={addressForm[name]}
                          onChange={handleAddressChange}
                          maxLength={maxLength}
                          className={addressErrors[name] ? 'input-error' : ''}
                          data-testid={`addr-${name}`}
                          aria-describedby={addressErrors[name] ? `addr-${name}-error` : undefined}
                        />
                        {addressErrors[name] && (
                          <span className="field-error" id={`addr-${name}-error`} role="alert" data-testid={`addr-${name}-error`}>
                            {addressErrors[name]}
                          </span>
                        )}
                      </div>
                    ))}

                    <div className="form-group full-width">
                      <label htmlFor="addr-input-state">State *</label>
                      <select
                        id="addr-input-state"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        className={addressErrors.state ? 'input-error' : ''}
                        data-testid="addr-state"
                      >
                        <option value="">Select State</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {addressErrors.state && <span className="field-error" role="alert">{addressErrors.state}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label>Address Type *</label>
                      <div className="addr-type-group">
                        {['Home', 'Office', 'Other'].map(t => (
                          <label key={t} className={`addr-type-btn ${addressForm.type === t ? 'selected' : ''}`} data-testid={`addr-type-${t.toLowerCase()}`}>
                            <input type="radio" name="type" value={t} checked={addressForm.type === t} onChange={handleAddressChange} style={{ display: 'none' }} />
                            {t === 'Home' ? '🏠' : t === 'Office' ? '🏢' : '📌'} {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="addr-form-actions">
                    <button className="btn" onClick={handleCancelAddressForm} data-testid="cancel-address-btn">Cancel</button>
                    <button className="btn primary" onClick={handleSaveAddress} data-testid="save-address-btn">Save Address</button>
                  </div>
                </div>
              )}

              {!showAddressForm && (
                <div className="step-nav">
                  <div />
                  <button
                    className="btn primary"
                    onClick={handleNextStep}
                    disabled={!selectedAddressId}
                    data-testid="next-to-payment-btn"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}
            </section>
          )}

          {/* ===== STEP 1: Payment ===== */}
          {step === 1 && (
            <section className="checkout-section" data-testid="step-payment">
              <h2 className="section-title">💳 Payment Method</h2>
              <div className="payment-list">
                {PAYMENT_METHODS.map((pm) => (
                  <div
                    key={pm.id}
                    className={`payment-option ${selectedPayment === pm.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment(pm.id)}
                    data-testid={`payment-${pm.id}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      id={`payment-${pm.id}`}
                      value={pm.id}
                      checked={selectedPayment === pm.id}
                      onChange={() => setSelectedPayment(pm.id)}
                    />
                    <label htmlFor={`payment-${pm.id}`} className="payment-label">
                      <span className="payment-icon">{pm.icon}</span>
                      <span className="payment-name">{pm.label}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="cod-info-box" data-testid="payment-info">
                <span>{selectedPayment === 'cod' ? '💵' : selectedPayment === 'upi' ? '📱' : selectedPayment === 'credit' ? '💳' : selectedPayment === 'debit' ? '🏧' : '🏦'}</span>
                <p>{PAYMENT_INFO[selectedPayment]}</p>
              </div>
              <div className="step-nav">
                <button className="btn" onClick={handlePrevStep} data-testid="back-to-address-btn">← Back</button>
                <button className="btn primary" onClick={handleNextStep} data-testid="next-to-summary-btn">
                  Review Order →
                </button>
              </div>
            </section>
          )}

          {/* ===== STEP 2: Order Summary ===== */}
          {step === 2 && (
            <section className="checkout-section" data-testid="step-summary">
              <h2 className="section-title">📋 Order Summary</h2>

              <div className="summary-items-list">
                {checkoutItems.map((item) => (
                  <div key={item.product.id} className="summary-item-row" data-testid={`summary-item-${item.product.id}`}>
                    <img src={item.product.image} alt={item.product.name} className="summary-item-img" />
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.product.name}</span>
                      <span className="summary-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="summary-price-breakdown">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Delivery</span><span>{deliveryCharge === 0 ? <span className="free-delivery">FREE</span> : `₹${deliveryCharge}`}</span></div>
                <div className="summary-divider" />
                <div className="summary-row summary-total"><span>Total</span><span data-testid="order-total">₹{grandTotal.toLocaleString('en-IN')}</span></div>
              </div>

              {selectedAddress && (
                <div className="summary-address-box" data-testid="summary-address">
                  <h4>📍 Delivery To</h4>
                  <p><strong>{selectedAddress.fullName}</strong> — {selectedAddress.mobile}</p>
                  <p>{selectedAddress.houseNo}, {selectedAddress.street}{selectedAddress.landmark ? `, Near ${selectedAddress.landmark}` : ''}, {selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pincode}</p>
                  <span className="address-type-badge">{selectedAddress.type}</span>
                </div>
              )}

              <div className="summary-payment-box" data-testid="summary-payment">
                <h4>💳 Payment</h4>
                <p>{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.label}</p>
              </div>

              <div className="step-nav">
                <button className="btn" onClick={handlePrevStep} data-testid="back-to-payment-btn">← Back</button>
                <button
                  className="btn primary confirm-order-btn"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  data-testid="confirm-order-btn"
                >
                  {isSubmitting
                    ? <><span className="spinner-sm" /> Placing Order...</>
                    : '🎉 Confirm Order'}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Checkout Sidebar */}
        <aside className="checkout-sidebar" data-testid="checkout-sidebar">
          <div className="sidebar-summary-box">
            <h3>Cart Summary</h3>
            {checkoutItems.map(item => (
              <div key={item.product.id} className="sidebar-item">
                <span className="sidebar-item-name">{item.product.name} × {item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="sidebar-total">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
