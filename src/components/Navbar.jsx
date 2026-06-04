import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [mobileSearchVal, setMobileSearchVal] = useState('');

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (val) => {
    if (val.trim()) {
      navigate(`/products?q=${encodeURIComponent(val.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchVal);
    }
  };

  const handleMobileSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(mobileSearchVal);
      setIsSearchOpen(false);
      setMobileSearchVal('');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <div className="brand">
            <Link to="/" className="brand-link" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none', color: 'inherit' }}>
              <img src="/assets/pk logo.png" alt="Peddamma's Kitchen logo" className="logo" loading="lazy" decoding="async" />
              <div>
                <div className="title">Peddamma’s Kitchen</div>
                <div style={{ fontSize: '.8rem', color: 'var(--brown)' }}>Homemade Andhra Food</div>
              </div>
            </Link>
          </div>

          {/* Nav Links (Desktop & Mobile Drawer) */}
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={isMenuOpen ? { right: 0 } : {}}>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Order Food</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, padding: '.9rem 1rem', width: '100%', textAlign: 'left', color: 'var(--maroon)' }}>
                    Logout ➔
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="nav-right">
            {isAuthenticated && (
              <>
                <div className="nav-search" role="search">
                  <input
                    id="navSearch"
                    placeholder="Search sweets, snacks, pickles..."
                    aria-label="Search products"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <button className="search-icon" aria-label="Search" onClick={() => handleSearchSubmit(searchVal)}></button>
                </div>
                <button
                  id="searchToggle"
                  className="search-toggle"
                  aria-label="Open search"
                  aria-expanded={isSearchOpen}
                  onClick={() => setIsSearchOpen(true)}
                ></button>
                <button
                  id="hamburger"
                  className="hamburger"
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  ☰
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for Mobile Drawer */}
      {isMenuOpen && (
        <div
          className="menu-backdrop"
          style={{ opacity: 1, pointerEvents: 'auto' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="mobile-search-overlay" onClick={(e) => { if (e.target.className === 'mobile-search-overlay') setIsSearchOpen(false); }}>
          <div className="search-panel" role="dialog" aria-modal="true">
            <input
              id="mobileSearchInput"
              placeholder="Search sweets, snacks, pickles..."
              aria-label="Search products"
              autoFocus
              value={mobileSearchVal}
              onChange={(e) => setMobileSearchVal(e.target.value)}
              onKeyDown={handleMobileSearchKeyDown}
            />
            <button className="close-search" aria-label="Close search" onClick={() => setIsSearchOpen(false)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
