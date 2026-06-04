import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const result = login(usernameInput, passwordInput);
    if (result.success) {
      navigate('/');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img 
              src="/assets/pk logo.png" 
              alt="Peddamma's Kitchen Logo" 
              style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', boxShadow: '0 8px 24px rgba(92,64,51,0.1)' }} 
            />
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--maroon)', fontSize: '2rem', margin: '0.8rem 0 0.2rem' }}>
              Peddamma’s Kitchen
            </h1>
            <p style={{ margin: 0, color: 'var(--brown)', fontSize: '0.9rem' }}>
              Authentic Homemade Andhra Food
            </p>
          </div>

          {/* Login Card */}
          <div className="contact-card" style={{ margin: 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--maroon)', margin: '0 0 1.2rem', fontSize: '1.4rem' }}>
              Log In
            </h2>
            
            {errorMsg && (
              <div style={{ background: '#f8d7da', color: '#721c24', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #f5c6cb' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: 0 }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Username</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter username" 
                  required 
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid #eee', fontSize: '1rem' }}
                />
              </div>
              <div style={{ marginTop: '0.8rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password" 
                  required 
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid #eee', fontSize: '1rem' }}
                />
              </div>
              <button 
                className="btn primary" 
                type="submit" 
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '1.2rem', cursor: 'pointer' }}
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Accepted Credentials Block */}
          <div className="info-card" style={{ marginTop: '1.2rem', border: '1px solid #eadcc9' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--maroon)', fontFamily: "'Playfair Display', serif" }}>
              Accepted Credentials:
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--brown)', lineHeight: '1.5' }}>
              <li><strong>test</strong></li>
              <li><strong>test@pk</strong></li>
              <li><strong>demo</strong></li>
              <li><strong>admin</strong></li>
            </ul>
            <div style={{ marginTop: '0.6rem', fontSize: '0.85rem', color: 'var(--brown)', borderTop: '1px dashed #eadcc9', paddingTop: '0.6rem' }}>
              Password for all users: <strong style={{ color: 'var(--maroon)' }}>test123</strong>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
