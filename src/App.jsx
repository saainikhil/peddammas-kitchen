import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import BulkOrders from './pages/BulkOrders';
import Contact from './pages/Contact';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      const topBtn = document.getElementById('topBtn');
      if (topBtn) {
        if (window.scrollY > 300) {
          topBtn.style.display = 'block';
        } else {
          topBtn.style.display = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar rendered if authenticated */}
      {isAuthenticated && <Navbar />}

      {/* Main content wrapper */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/bulk-orders" element={<ProtectedRoute><BulkOrders /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          
          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Footer (Login page renders its own, so we render it for other pages) */}
      {!isLoginPage && <Footer />}

      {/* Floating Utilities (visible when authenticated) */}
      {isAuthenticated && (
        <>
          <button id="topBtn" title="Go to top" onClick={handleScrollToTop}>
            ↑
          </button>
          <a 
            className="whatsapp-float" 
            href="https://wa.me/918886880507" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="WhatsApp"
          >
            <img src="/assets/icons/whatsapp.svg" alt="WhatsApp" loading="lazy" decoding="async" />
          </a>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
