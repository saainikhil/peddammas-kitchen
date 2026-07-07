import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.badges.includes('Best Seller')).slice(0, 4);

  const handleExploreMenu = (e) => {
    e.preventDefault();
    const section = document.getElementById('products');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Authentic Homemade Taste from Peddamma's Kitchen</h1>
          <p className="sub">Made with Love, Tradition &amp; Pure Ingredients</p>
          <div className="hero-cta">
            <Link className="btn primary" to="/products" data-testid="hero-order-btn">Order Now</Link>
            <a className="btn ghost" href="#products" onClick={handleExploreMenu} data-testid="hero-explore-btn">Explore Menu</a>
          </div>
        </div>
        <div className="hero-collage">
          <img src="/assets/images/about us.png" alt="Assorted Andhra sweets and snacks" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Products */}
      <section id="products" className="featured container">
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--maroon)' }}>Best Sellers</h2>
        <div className="product-grid enriched-grid" id="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/products" className="btn primary" data-testid="view-all-btn">View All Products →</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials container">
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--maroon)', marginBottom: '1.5rem' }}>What Families Say</h2>
        <div className="test-grid">
          <blockquote style={{ background: '#fff', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 18px rgba(92,64,51,0.06)', margin: 0, borderLeft: '4px solid var(--gold)' }}>
            "Tastes like home. Peddamma's 7 Cups Sweet is pure nostalgia." — <strong>S. Reddy</strong>
          </blockquote>
          <blockquote style={{ background: '#fff', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 18px rgba(92,64,51,0.06)', margin: 0, borderLeft: '4px solid var(--gold)' }}>
            "Fresh, hygienic and packed with love. My go-to for festivals!" — <strong>Ananya</strong>
          </blockquote>
        </div>
      </section>
    </main>
  );
};

export default Home;
