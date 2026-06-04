import React from 'react';

const BulkOrders = () => {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('bulk-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your quote request has been received. We will contact you soon.');
    e.target.reset();
  };

  return (
    <main className="container bulk-page">
      {/* Hero */}
      <section className="bulk-hero">
        <div className="hero-content">
          <h1>Bulk Orders & Catering</h1>
          <p className="sub">
            Premium homemade Andhra food for weddings, festivals, prasads and corporate events. 
            Tell us your details and we'll prepare a tailored quote with menu and pricing.
          </p>
          <a className="btn primary" href="#bulk-form" onClick={handleScrollToForm}>Request Quote</a>
        </div>
        <div className="hero-image">
          <img src="assets/images/about us.png" alt="Bulk catering by Peddamma's Kitchen" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* Form & Info Section */}
      <section id="bulk-form" className="bulk-form-section">
        <div className="form-card">
          <h2>Tell Us About Your Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="two-col">
              <label>
                Event Name
                <input type="text" name="event" placeholder="Event / Occasion" required />
              </label>
              <label>
                Quantity
                <input type="text" name="quantity" placeholder="Approx number of persons" required />
              </label>
            </div>
            <div className="two-col">
              <label>
                Contact Number
                <input type="tel" name="phone" placeholder="+91" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>
            <div className="two-col">
              <label>
                Event Date
                <input type="date" name="date" required />
              </label>
              <label>
                Location
                <input type="text" name="location" placeholder="Venue / City" required />
              </label>
            </div>
            <label style={{ display: 'block', width: '100%', marginBottom: '.75rem' }}>
              Message
              <textarea name="message" placeholder="Any special requirements or menu preferences" style={{ width: '100%' }}></textarea>
            </label>
            <div style={{ textAlign: 'right' }}>
              <button className="btn primary" type="submit">Request Quote</button>
            </div>
          </form>
        </div>

        <aside className="info-card">
          <h3>What we offer</h3>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>Custom menus for prasads, weddings and corporate events</li>
            <li>Hygienic kitchen and fresh daily preparation</li>
            <li>Timely delivery & on-site setup (where required)</li>
          </ul>
          <p style={{ marginTop: '1.2rem' }}>
            <strong>Phone:</strong> <a href="tel:+918886880507" style={{ color: 'var(--maroon)' }}>+91 88868 80507</a>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <strong>Email:</strong> <a href="mailto:info@peddammaskitchen.com" style={{ color: 'var(--maroon)' }}>info@peddammaskitchen.com</a>
          </p>
        </aside>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <h2>Why Choose Peddamma’s Kitchen</h2>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-body">
              <h3>Authentic Flavours</h3>
              <p>Recipes handed down through generations.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Fresh Ingredients</h3>
              <p>Locally sourced, premium produce.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Flexible Menus</h3>
              <p>Vegetarian, prasadam and custom dietary options.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Trusted Service</h3>
              <p>On-time delivery and professional handling.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default BulkOrders;
