import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { validateAddressForm } from '../utils/validators';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '../components/Modal';
import Breadcrumb from '../components/Breadcrumb';

const STATES = [
  'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala',
  'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan', 'West Bengal',
  'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Punjab', 'Other'
];

const emptyAddress = {
  fullName: '', mobile: '', houseNo: '', street: '',
  landmark: '', city: '', state: '', pincode: '', type: 'Home'
};

const Addresses = () => {
  const { showToast } = useToast();
  const [addresses, setAddresses] = useLocalStorage('pk_addresses', []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAddress);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (addr) => {
    setEditingId(addr.id);
    setForm(addr);
    setErrors({});
    setShowForm(true);
  };

  const handleSave = () => {
    const errs = validateAddressForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Please fix form errors', 'error');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      if (editingId) {
        setAddresses(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId, isDefault: a.isDefault } : a));
        showToast('Address updated!', 'success');
      } else {
        const newAddr = { ...form, id: Date.now().toString(), isDefault: addresses.length === 0 };
        setAddresses(prev => [...prev, newAddr]);
        showToast('Address added!', 'success');
      }
      setShowForm(false);
      setIsSaving(false);
      setEditingId(null);
      setForm(emptyAddress);
    }, 500);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyAddress);
    setErrors({});
  };

  const confirmDelete = (addr) => {
    setDeleteModal({ isOpen: true, id: addr.id, name: addr.fullName });
  };

  const handleDelete = () => {
    const idToDelete = deleteModal.id;
    const wasDefault = addresses.find(a => a.id === idToDelete)?.isDefault;
    setAddresses(prev => {
      let updated = prev.filter(a => a.id !== idToDelete);
      // If deleted was default and others exist, set first as default
      if (wasDefault && updated.length > 0) {
        updated = updated.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
      }
      return updated;
    });
    setDeleteModal({ isOpen: false, id: null, name: '' });
    showToast('Address deleted', 'info');
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated', 'success');
  };

  return (
    <main className="container addresses-page" data-testid="addresses-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Profile', to: '/profile' }, { label: 'My Addresses' }]} />
      <div className="page-header-row">
        <h1 className="page-title">My Addresses</h1>
        {!showForm && (
          <button className="btn primary" onClick={openAddForm} data-testid="add-new-address-btn">
            + Add New Address
          </button>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="address-form-card" data-testid="address-form">
          <h3>{editingId ? 'Edit Address' : 'Add New Address'}</h3>
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
                <label htmlFor={`manage-addr-${name}`}>{label}</label>
                <input
                  id={`manage-addr-${name}`}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  maxLength={maxLength}
                  className={errors[name] ? 'input-error' : ''}
                  data-testid={`manage-addr-${name}`}
                />
                {errors[name] && <span className="field-error" role="alert">{errors[name]}</span>}
              </div>
            ))}

            <div className="form-group full-width">
              <label htmlFor="manage-addr-state">State *</label>
              <select
                id="manage-addr-state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={errors.state ? 'input-error' : ''}
                data-testid="manage-addr-state"
              >
                <option value="">Select State</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="field-error" role="alert">{errors.state}</span>}
            </div>

            <div className="form-group full-width">
              <label>Address Type *</label>
              <div className="addr-type-group">
                {['Home', 'Office', 'Other'].map(t => (
                  <label key={t} className={`addr-type-btn ${form.type === t ? 'selected' : ''}`} data-testid={`manage-type-${t.toLowerCase()}`}>
                    <input type="radio" name="type" value={t} checked={form.type === t} onChange={handleChange} style={{ display: 'none' }} />
                    {t === 'Home' ? '🏠' : t === 'Office' ? '🏢' : '📌'} {t}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="addr-form-actions">
            <button className="btn" onClick={handleCancel} data-testid="cancel-addr-btn">Cancel</button>
            <button className="btn primary" onClick={handleSave} disabled={isSaving} data-testid="save-addr-btn">
              {isSaving ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showForm ? (
        <div className="empty-state" data-testid="no-addresses-state">
          <div className="empty-state-icon">📭</div>
          <h2>No saved addresses</h2>
          <p>Add a delivery address to make checkout faster.</p>
        </div>
      ) : (
        <div className="address-cards-list" data-testid="address-cards-list">
          {addresses.map((addr) => (
            <div key={addr.id} className={`address-card-manage ${addr.isDefault ? 'address-card-default' : ''}`} data-testid={`address-card-${addr.id}`}>
              <div className="address-card-manage-header">
                <div className="address-badges">
                  <span className="address-type-badge">{addr.type}</span>
                  {addr.isDefault && <span className="default-badge" data-testid={`default-badge-${addr.id}`}>Default</span>}
                </div>
                <div className="address-card-actions">
                  {!addr.isDefault && (
                    <button className="btn btn-sm" onClick={() => handleSetDefault(addr.id)} data-testid={`set-default-${addr.id}`}>
                      Set Default
                    </button>
                  )}
                  <button className="btn btn-sm" onClick={() => openEditForm(addr)} data-testid={`edit-addr-${addr.id}`}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-sm btn-danger-outline" onClick={() => confirmDelete(addr)} data-testid={`delete-addr-${addr.id}`}>
                    🗑 Delete
                  </button>
                </div>
              </div>
              <div className="address-card-manage-body">
                <strong className="addr-name">{addr.fullName}</strong>
                <span className="addr-mobile">📞 {addr.mobile}</span>
                <p className="address-text">
                  {addr.houseNo}, {addr.street}
                  {addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city}, {addr.state} – {addr.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Address"
        message={`Are you sure you want to delete the address for "${deleteModal.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Keep Address"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
      />
    </main>
  );
};

export default Addresses;
