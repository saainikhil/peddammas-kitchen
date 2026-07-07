import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully. We will get back to you shortly.');
    e.target.reset();
  };

  return (
    <main className="container contact-page">
      <section className="contact-section">
        <div className="contact-grid">
          {/* Form Card */}
          <div className="contact-card">
            <h1 style={{ marginTop: 0, fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
            <p style={{ color: '#5b463e' }}>
              Have a question or want to place an order? Fill the form and we'll get back to you.
            </p>
            <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="tel" name="phone" placeholder="Phone number" required />
              <input type="email" name="email" placeholder="Email (optional)" />
              <textarea name="message" rows="5" placeholder="Message" required></textarea>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '.4rem' }}>
                <button className="btn primary" type="submit">Send Message</button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <aside className="info-card">
            <h3 style={{ marginTop: 0 }}>Reach Us</h3>
            <p style={{ margin: '.25rem 0' }}>
              Phone: <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+91 98765 43210</a>
            </p>
            <p style={{ margin: '.25rem 0' }}>
              WhatsApp: <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>Chat on WhatsApp</a>
            </p>
            <p style={{ margin: '.25rem 0' }}>
              Email: <a href="mailto:info@peddammaskitchen.com" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>info@peddammaskitchen.com</a>
            </p>
            
            <h4 style={{ marginTop: '1rem', marginBottom: '0.4rem' }}>Working Hours</h4>
            <p style={{ margin: '.25rem 0' }}>Mon–Sat: 8:00 AM – 8:00 PM</p>
            
            <h4 style={{ marginTop: '1rem', marginBottom: '0.4rem' }}>Address</h4>
            <p style={{ margin: '.25rem 0' }}>
              Peddamma’s Kitchen, Near Clock Tower, Anantapur, Andhra Pradesh – 515001, India
            </p>
            
            <div style={{ marginTop: '1.2rem', display: 'flex', gap: '.6rem' }}>
              <a href="https://www.instagram.com/peddammaskitchen" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '.5rem 1rem', borderRadius: '8px', background: 'var(--maroon)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                Instagram
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '.5rem 1rem', borderRadius: '8px', background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                WhatsApp
              </a>
            </div>
          </aside>
        </div>

        {/* Google Maps embed */}
        <div style={{ marginTop: '1.4rem', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(92,64,51,0.06)' }}>
          <iframe
            src="https://www.google.com/maps?q=Clock+Tower+Anantapur&output=embed"
            style={{ width: '100%', height: '320px', border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contact;
