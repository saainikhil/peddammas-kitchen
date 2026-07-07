import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Breadcrumb navigation component.
 * @param {Array} items - Array of { label, to } objects. Last item is current (no link).
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" data-testid="breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
