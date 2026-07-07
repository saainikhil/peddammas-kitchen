import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="container not-found-page" data-testid="not-found-page">
    <div className="not-found-content">
      <div className="not-found-icon" aria-hidden="true">🍱</div>
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-msg">
        Oops! Looks like this page went out of stock. Let's get you back to the menu.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn primary" data-testid="go-home-404">Go to Home</Link>
        <Link to="/products" className="btn" data-testid="browse-products-404">Browse Products</Link>
      </div>
    </div>
  </main>
);

export default NotFound;
