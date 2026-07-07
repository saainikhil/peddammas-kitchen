import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import Breadcrumb from '../components/Breadcrumb';
import { products } from '../data/products';

const CATEGORIES = ['All', 'Sweets', 'Pickles', 'Snacks', 'Powders'];

const SORT_OPTIONS = [
  { value: 'default',     label: 'Default' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc',    label: 'Name: A-Z' },
];

const PAGE_SIZE = 8;

const Products = () => {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort]         = useState('default');
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(true);
  const [vegOnly, setVegOnly]   = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Simulate skeleton loader on mount
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, category, sort, vegOnly, inStockOnly]);

  // Filter
  let filtered = products.filter((p) => {
    const term = search.trim().toLowerCase();
    const matchSearch = !term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
    const matchCategory = category === 'All' || p.category === category;
    const matchVeg = !vegOnly || p.isVeg;
    const matchStock = !inStockOnly || p.availability !== 'Out of Stock';
    return matchSearch && matchCategory && matchVeg && matchStock;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':   return a.price - b.price;
      case 'price-desc':  return b.price - a.price;
      case 'rating-desc': return b.rating - a.rating;
      case 'name-asc':    return a.name.localeCompare(b.name);
      default:            return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="container products-page" data-testid="products-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Order Food' }]} />
      <h1 className="page-title">Order Food</h1>

      {/* Search Bar */}
      <div className="products-search-row" data-testid="products-search-row">
        <div className="search-container" role="search">
          <input
            id="searchBox"
            placeholder="Search sweets, snacks, pickles…"
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="product-search-input"
          />
          {search && (
            <button
              className="btn search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              data-testid="clear-search-btn"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            className="search-cta"
            onClick={() => setSearch(search.trim())}
            aria-label="Search"
            data-testid="search-submit-btn"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="products-controls" data-testid="products-controls">
        {/* Category Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Product categories" data-testid="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              className={`tab-btn ${category === cat ? 'tab-active' : ''}`}
              onClick={() => setCategory(cat)}
              data-testid={`tab-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="controls-right">
          {/* Toggle Filters */}
          <label className="toggle-filter" data-testid="veg-toggle-label">
            <input
              type="checkbox"
              id="vegOnlyToggle"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              data-testid="veg-only-toggle"
            />
            <span className="toggle-switch" aria-hidden="true" />
            <span className="toggle-label">Veg Only</span>
          </label>

          <label className="toggle-filter" data-testid="in-stock-toggle-label">
            <input
              type="checkbox"
              id="inStockToggle"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              data-testid="in-stock-toggle"
            />
            <span className="toggle-switch" aria-hidden="true" />
            <span className="toggle-label">In Stock</span>
          </label>

          {/* Sort Dropdown */}
          <div className="sort-wrapper">
            <label htmlFor="sortSelect" className="sort-label">Sort by:</label>
            <select
              id="sortSelect"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
              data-testid="sort-select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Summary */}
      <div className="results-summary" data-testid="results-summary" aria-live="polite">
        {loading ? 'Loading products…' : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}${category !== 'All' ? ` in ${category}` : ''}`}
      </div>

      {/* Product Grid */}
      <div className="product-grid enriched-grid" id="product-list" data-testid="product-grid">
        {loading ? (
          Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginated.length > 0 ? (
          paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results" style={{ gridColumn: '1/-1' }} data-testid="no-results">
            <div className="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn primary" onClick={() => { setSearch(''); setCategory('All'); setVegOnly(false); setInStockOnly(false); }} data-testid="clear-filters-btn">
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <nav className="pagination" aria-label="Product pagination" data-testid="pagination">
          <button
            className="pagination-btn"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            data-testid="prev-page-btn"
          >
            ‹ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`pagination-btn pagination-num ${page === p ? 'active' : ''}`}
              onClick={() => setPage(p)}
              aria-label={`Page ${p}`}
              aria-current={page === p ? 'page' : undefined}
              data-testid={`page-btn-${p}`}
            >
              {p}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            data-testid="next-page-btn"
          >
            Next ›
          </button>
        </nav>
      )}
    </main>
  );
};

export default Products;
