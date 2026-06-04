import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchVal, setSearchVal] = useState(query);

  // Sync state if URL param updates (e.g. from navbar search)
  useEffect(() => {
    setSearchVal(query);
  }, [query]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    
    // Update URL query param reactively
    if (val.trim()) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchClear = () => {
    setSearchVal('');
    setSearchParams({});
  };

  // Filter products based on search term
  const filteredProducts = products.filter((p) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  return (
    <main className="container products-page">
      <h1>Order Food</h1>
      
      <div className="search-row">
        <div className="search-container">
          <input
            id="searchBox"
            placeholder="Search products, categories or descriptions"
            aria-label="Search products"
            value={searchVal}
            onChange={handleSearchChange}
          />
          {searchVal && (
            <button 
              className="btn" 
              onClick={handleSearchClear}
              style={{ border: 'none', background: 'transparent', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--maroon)' }}
            >
              Clear
            </button>
          )}
          <button className="search-cta" onClick={() => setSearchParams(searchVal ? { q: searchVal } : {})}>
            Search
          </button>
        </div>
      </div>

      <div className="product-grid" id="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showAdd={true} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--brown)', fontSize: '1.1rem' }}>
            No products found matching your search.
          </div>
        )}
      </div>

      <div className="cart-summary" id="cartSummary"></div>
    </main>
  );
};

export default Products;
