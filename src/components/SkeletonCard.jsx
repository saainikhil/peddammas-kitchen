import React from 'react';

/**
 * Skeleton card used as placeholder while products load.
 */
const SkeletonCard = () => {
  return (
    <div className="skeleton-card" aria-hidden="true" data-testid="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-badge" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
};

export default SkeletonCard;
