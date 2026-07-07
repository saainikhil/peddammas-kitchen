import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateProfileForm } from '../utils/validators';
import useLocalStorage from '../hooks/useLocalStorage';
import Breadcrumb from '../components/Breadcrumb';

const Profile = () => {
  const { username, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [orders] = useLocalStorage('pk_orders', []);
  const [addresses] = useLocalStorage('pk_addresses', []);
  const [profile, setProfile] = useLocalStorage('pk_user_profile', {
    name: username || '',
    email: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSave = () => {
    const errors = validateProfileForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix form errors', 'error');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setProfile(form);
      setIsEditing(false);
      setIsSaving(false);
      showToast('Profile updated successfully!', 'success');
    }, 600);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    showToast('Logged out successfully', 'info');
  };

  const initials = (profile.name || username || 'U').slice(0, 2).toUpperCase();

  return (
    <main className="container profile-page" data-testid="profile-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Profile' }]} />
      <h1 className="page-title">My Profile</h1>

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="profile-card" data-testid="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar" data-testid="profile-avatar" aria-label="User avatar">
              {initials}
            </div>
            <div>
              <h2 className="profile-name" data-testid="profile-name">{profile.name || username}</h2>
              <span className="profile-username-tag">@{username}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats" data-testid="profile-stats">
            <div className="stat-item">
              <span className="stat-value" data-testid="total-orders">{orders.length}</span>
              <span className="stat-label">Orders</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value" data-testid="total-addresses">{addresses.length}</span>
              <span className="stat-label">Addresses</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">{orders.filter(o => o.status === 'Delivered').length}</span>
              <span className="stat-label">Delivered</span>
            </div>
          </div>

          {/* Profile Info / Edit Form */}
          {!isEditing ? (
            <div className="profile-info-section" data-testid="profile-info">
              <div className="profile-info-row">
                <span className="profile-info-label">Name</span>
                <span className="profile-info-value" data-testid="display-name">{profile.name || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value" data-testid="display-email">{profile.email || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Phone</span>
                <span className="profile-info-value" data-testid="display-phone">{profile.phone || '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Username</span>
                <span className="profile-info-value">{username}</span>
              </div>
              <button
                className="btn primary edit-profile-btn"
                onClick={() => { setForm({ ...profile }); setIsEditing(true); }}
                data-testid="edit-profile-btn"
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit-form" data-testid="profile-edit-form">
              {[
                { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="form-group">
                  <label htmlFor={`profile-${name}`}>{label}</label>
                  <input
                    id={`profile-${name}`}
                    name={name}
                    type={type}
                    value={form[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={formErrors[name] ? 'input-error' : ''}
                    data-testid={`profile-input-${name}`}
                  />
                  {formErrors[name] && (
                    <span className="field-error" role="alert" data-testid={`profile-error-${name}`}>
                      {formErrors[name]}
                    </span>
                  )}
                </div>
              ))}
              <div className="profile-edit-actions">
                <button className="btn" onClick={() => { setIsEditing(false); setFormErrors({}); }} data-testid="cancel-edit-btn">
                  Cancel
                </button>
                <button className="btn primary" onClick={handleSave} disabled={isSaving} data-testid="save-profile-btn">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="profile-quick-links" data-testid="profile-quick-links">
            <Link to="/orders" className="quick-link-btn" data-testid="profile-orders-link">
              📦 My Orders
            </Link>
            <Link to="/addresses" className="quick-link-btn" data-testid="profile-addresses-link">
              📍 My Addresses
            </Link>
            <button className="quick-link-btn logout-link" onClick={handleLogout} data-testid="profile-logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div className="profile-sidebar">
          <div className="recent-orders-card" data-testid="recent-orders">
            <div className="card-header-row">
              <h3>Recent Orders</h3>
              <Link to="/orders" className="view-all-link">View All →</Link>
            </div>
            {orders.length === 0 ? (
              <div className="no-data-msg" data-testid="no-recent-orders">No orders placed yet.</div>
            ) : (
              orders.slice(0, 3).map(order => (
                <div key={order.id} className="recent-order-row" data-testid={`recent-order-${order.id}`}>
                  <div>
                    <div className="recent-order-id">{order.id}</div>
                    <div className="recent-order-items">{order.items?.[0]?.name}{order.items?.length > 1 ? ` +${order.items.length - 1}` : ''}</div>
                  </div>
                  <span className={`status-badge status-badge-sm ${order.status === 'Delivered' ? 'badge-delivered' : order.status === 'Ordered' ? 'badge-ordered' : 'badge-preparing'}`}>
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="saved-addresses-card" data-testid="saved-addresses-preview">
            <div className="card-header-row">
              <h3>Saved Addresses</h3>
              <Link to="/addresses" className="view-all-link">Manage →</Link>
            </div>
            {addresses.length === 0 ? (
              <div className="no-data-msg" data-testid="no-addresses">No addresses saved.</div>
            ) : (
              addresses.slice(0, 2).map(addr => (
                <div key={addr.id} className="address-preview-row" data-testid={`profile-addr-${addr.id}`}>
                  <span className="address-type-badge">{addr.type}</span>
                  <span className="address-preview-text">{addr.houseNo}, {addr.city}</span>
                  {addr.isDefault && <span className="default-badge">Default</span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
