import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout, username } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/products', label: 'Order Food' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Brand */}
          <div className="brand">
            <Link
              to="/"
              className="brand-link"
              style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none', color: 'inherit' }}
              aria-label="Peddamma's Kitchen — Home"
            >
              <img src="/assets/pk logo.png" alt="Peddamma's Kitchen logo" className="logo" loading="lazy" decoding="async" />
              <div>
                <div className="title">Peddamma's Kitchen</div>
                <div style={{ fontSize: '.8rem', color: 'var(--brown)' }}>Homemade Andhra Food</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={isMenuOpen ? { right: 0 } : {}}>
            {isAuthenticated && (
              <>
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) => isActive ? 'active' : ''}
                      onClick={() => setIsMenuOpen(false)}
                      data-testid={`nav-${label.toLowerCase().replace(' ', '-')}`}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}

                {/* Cart — mobile menu */}
                <li className="mobile-only-nav">
                  <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
                    🛒 Cart {cartCount > 0 && <span className="cart-badge-inline">{cartCount}</span>}
                  </NavLink>
                </li>

                {/* WhatsApp — mobile menu */}
                <li className="mobile-only-nav">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#25D366', fontWeight: 700 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📱 WhatsApp Order
                  </a>
                </li>

                {/* Profile links — mobile menu */}
                <li className="mobile-only-nav">
                  <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
                    👤 My Profile
                  </NavLink>
                </li>
                <li className="mobile-only-nav">
                  <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
                    📦 My Orders
                  </NavLink>
                </li>
                <li className="mobile-only-nav">
                  <NavLink to="/addresses" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
                    📍 My Addresses
                  </NavLink>
                </li>
                <li className="mobile-only-nav">
                  <button
                    onClick={handleLogout}
                    className="btn"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, padding: '.9rem 1rem', width: '100%', textAlign: 'left', color: 'var(--maroon)' }}
                    data-testid="mobile-logout-btn"
                  >
                    Logout ➔
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Right Side Controls */}
          {isAuthenticated && (
            <div className="nav-right">
              {/* WhatsApp Desktop */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="nav-whatsapp desktop-only"
                aria-label="WhatsApp Order"
                data-testid="nav-whatsapp"
                title="Order via WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="nav-cart"
                aria-label={`Cart, ${cartCount} items`}
                data-testid="nav-cart-btn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="cart-badge" aria-live="polite" data-testid="cart-count-badge">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="profile-dropdown" ref={profileRef}>
                <button
                  className="profile-icon-btn"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  aria-label="Profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  data-testid="profile-icon-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="profile-username desktop-only">{username}</span>
                </button>

                {isProfileOpen && (
                  <div className="profile-menu" role="menu" data-testid="profile-menu">
                    <div className="profile-menu-header">
                      <span>👋 Hi, {username}!</span>
                    </div>
                    <Link
                      to="/profile"
                      className="profile-menu-item"
                      role="menuitem"
                      onClick={() => setIsProfileOpen(false)}
                      data-testid="menu-my-profile"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      My Profile
                    </Link>
                    <Link
                      to="/addresses"
                      className="profile-menu-item"
                      role="menuitem"
                      onClick={() => setIsProfileOpen(false)}
                      data-testid="menu-my-addresses"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      My Addresses
                    </Link>
                    <Link
                      to="/orders"
                      className="profile-menu-item"
                      role="menuitem"
                      onClick={() => setIsProfileOpen(false)}
                      data-testid="menu-my-orders"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                      </svg>
                      My Orders
                    </Link>
                    <div className="profile-menu-divider" />
                    <button
                      className="profile-menu-item profile-menu-logout"
                      role="menuitem"
                      onClick={handleLogout}
                      data-testid="menu-logout"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Hamburger */}
              <button
                id="hamburger"
                className="hamburger"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="hamburger-btn"
              >
                ☰
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for Mobile Drawer */}
      {isMenuOpen && (
        <div
          className="menu-backdrop"
          style={{ opacity: 1, pointerEvents: 'auto' }}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
