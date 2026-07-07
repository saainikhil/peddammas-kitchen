import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="site-footer" style={{ background: 'var(--maroon)', color: '#fff', padding: '3rem 0', marginTop: '2rem' }}>
      <div className="container footer-grid">
        {/* About */}
        <div>
          <h4 style={{ color: '#fff', marginTop: 0 }}>About Us</h4>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontSize: '.9rem' }}>
            Peddamma's Kitchen — Homemade Andhra food prepared with care, tradition and hygiene. 100% natural, no preservatives.
          </p>
          <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: '100% Homemade', icon: '🏠' },
              { label: 'No Preservatives', icon: '✅' },
              { label: 'FSSAI Certified', icon: '🏅' },
            ].map(b => (
              <span key={b.label} style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '20px', fontSize: '.72rem', fontWeight: 600 }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#fff', marginTop: 0 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {[
              { to: '/',           label: 'Home' },
              { to: '/products',   label: 'Order Food' },
              { to: '/about',      label: 'About Us' },
              { to: '/contact',    label: 'Contact Us' },
              { to: '/cart',       label: '🛒 Cart' },
              { to: '/orders',     label: '📦 My Orders' },
              { to: '/profile',    label: '👤 My Profile' },
              { to: '/bulk-orders',label: 'Bulk Orders' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '.88rem', transition: 'color .18s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#fff', marginTop: 0 }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '.88rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              📞 <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+91 98765 43210</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              📧 <a href="mailto:info@peddammaskitchen.com" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>info@peddammaskitchen.com</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              📍 Near Clock Tower, Anantapur, AP – 515001
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '.82rem' }}>
              🕐 Mon–Sat: 8:00 AM – 8:00 PM
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {[
              { href: '#', label: '📸 Instagram', hoverColor: '#E1306C' },
              { href: '#', label: '👍 Facebook', hoverColor: '#4267B2' },
              { href: 'https://wa.me/919876543210', label: '💬 WhatsApp', hoverColor: '#25D366' },
            ].map(({ href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noreferrer' : undefined}
                style={{ display: 'inline-block', padding: '.4rem .8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', color: '#fff', textDecoration: 'none', fontSize: '.8rem', fontWeight: 600, transition: 'background .2s, transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = hoverColor; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}
                aria-label={label}
                data-testid={`footer-social-${label.split(' ')[1]?.toLowerCase()}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: '#fff', marginTop: 0 }}>Newsletter</h4>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.88rem' }}>Subscribe for offers, new products and seasonal specials.</p>
          {subscribed ? (
            <div style={{ background: 'rgba(46,204,113,0.2)', border: '1px solid rgba(46,204,113,0.4)', borderRadius: '8px', padding: '.7rem', color: '#2ecc71', fontWeight: 600, fontSize: '.88rem' }} data-testid="subscribe-success">
              ✓ Thank you for subscribing!
            </div>
          ) : (
            <form style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }} onSubmit={handleSubscribe} data-testid="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ padding: '.65rem .8rem', borderRadius: '8px', border: 0, fontSize: '.88rem', outline: 'none' }}
                data-testid="newsletter-email"
                aria-label="Email address for newsletter"
              />
              <button
                className="btn"
                type="submit"
                style={{ background: 'var(--gold)', color: 'var(--maroon)', borderRadius: '8px', padding: '.6rem .8rem', fontWeight: 700, border: 0, cursor: 'pointer', transition: 'opacity .18s' }}
                data-testid="newsletter-subscribe-btn"
              >
                Subscribe
              </button>
            </form>
          )}
          <p style={{ marginTop: '.8rem', color: 'rgba(255,255,255,0.55)', fontSize: '.78rem' }}>FSSAI License: Available on request</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.6rem', fontSize: '.85rem' }}>
        <div style={{ color: 'rgba(255,255,255,0.8)' }}>
          © 2026 Peddamma's Kitchen. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.65)' }}>
          <a href="https://www.example.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>Privacy Policy</a>
          <a href="https://www.example.com/terms" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>Terms of Use</a>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
