import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer" style={{ background: 'var(--maroon)', color: '#fff', padding: '3rem 0', marginTop: '2rem' }}>
      <div className="container footer-grid">
        <div>
          <h4 style={{ color: '#fff' }}>About Us</h4>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            Peddamma's Kitchen — Homemade Andhra food prepared with care, tradition and hygiene.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
            <li>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>Home</Link>
            </li>
            <li>
              <Link to="/products" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>Order Food</Link>
            </li>
            <li>
              <Link to="/bulk-orders" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>Bulk Orders</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Contact</h4>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            Phone: <a href="tel:+918886880507" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88868 80507</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            Email: <a href="mailto:info@peddammaskitchen.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@peddammaskitchen.com</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '.6rem' }}>
            Address: Peddamma’s Kitchen, Near Clock Tower, Anantapur, Andhra Pradesh – 515001
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff' }}>Newsletter</h4>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>Subscribe for offers and new products</p>
          <form style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" style={{ padding: '.6rem', borderRadius: '8px', border: 0, minWidth: '160px' }} />
            <button className="btn" style={{ background: 'var(--gold)', color: 'var(--maroon)', borderRadius: '8px', padding: '.6rem .8rem', fontWeight: 700 }}>
              Subscribe
            </button>
          </form>
          <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>FSSAI License: Available on request</p>
        </div>
      </div>
      <div className="footer-bottom container" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '1.2rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.6rem' }}>
        <div style={{ color: 'rgba(255,255,255,0.9)' }}>© 2026 Peddamma’s Kitchen. All Rights Reserved.</div>
        <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
          <div className="newsletter" style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <input placeholder="Your email" style={{ padding: '.5rem', borderRadius: '8px', border: 0, minWidth: '200px' }} />
            <button className="btn" style={{ background: 'var(--gold)', color: 'var(--maroon)', borderRadius: '8px', padding: '.5rem .8rem' }}>Subscribe</button>
          </div>
          <div className="socials" style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.9)' }}>Instagram</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.9)' }}>Facebook</a>
            <a href="https://wa.me/918886880507" style={{ color: 'rgba(255,255,255,0.9)' }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
