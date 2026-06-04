import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  // Extract first 4 products as featured items
  const featuredProducts = products.slice(0, 4);

  const handleExploreMenu = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Authentic Homemade Taste from Peddamma’s Kitchen</h1>
          <p className="sub">Made with Love, Tradition & Pure Ingredients</p>
          <div className="hero-cta">
            <Link className="btn primary" to="/products">Order Now</Link>
            <a className="btn ghost" href="#products" onClick={handleExploreMenu}>Explore Menu</a>
          </div>
        </div>
        <div className="hero-collage">
          <img src="assets/images/about us.png" alt="Assorted Andhra sweets and snacks" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Products */}
      <section id="products" className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid" id="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="center" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/products" className="btn">View All</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Families Say</h2>
        <div className="test-grid">
          <blockquote>“Tastes like home. Peddamma’s 7 Cups Sweet is pure nostalgia.” — S. Reddy</blockquote>
          <blockquote>“Fresh, hygienic and packed with love.” — Ananya</blockquote>
        </div>
      </section>
    </main>
  );
};

export default Home;
