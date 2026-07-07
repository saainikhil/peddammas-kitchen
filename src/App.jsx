import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login        from './pages/Login';
import Home         from './pages/Home';
import About        from './pages/About';
import Products     from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import BulkOrders   from './pages/BulkOrders';
import Contact      from './pages/Contact';
import Cart         from './pages/Cart';
import Checkout     from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders       from './pages/Orders';
import Profile      from './pages/Profile';
import Addresses    from './pages/Addresses';
import NotFound     from './pages/NotFound';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const topBtn = document.getElementById('topBtn');
      if (topBtn) {
        topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getTitle = () => {
      if (location.pathname === '/') return 'Home';
      if (location.pathname === '/about') return 'About';
      if (location.pathname === '/products') return 'Order Food';
      if (location.pathname.startsWith('/product/')) return 'Product Detail';
      if (location.pathname === '/bulk-orders') return 'Bulk Orders';
      if (location.pathname === '/contact') return 'Contact';
      if (location.pathname === '/cart') return 'Cart';
      if (location.pathname === '/checkout') return 'Checkout';
      if (location.pathname === '/order-success') return 'Order Success';
      if (location.pathname === '/orders') return 'My Orders';
      if (location.pathname === '/profile') return 'Profile';
      if (location.pathname === '/addresses') return 'Addresses';
      if (location.pathname === '/login') return 'Login';
      if (location.pathname === '/404') return 'Page Not Found';
      return 'Peddamma’s Kitchen';
    };

    document.title = `${getTitle()} | Peddamma’s Kitchen`;
  }, [location.pathname]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isAuthenticated && <Navbar />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/"               element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about"          element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/products"       element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/product/:id"    element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/bulk-orders"    element={<ProtectedRoute><BulkOrders /></ProtectedRoute>} />
          <Route path="/contact"        element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/cart"           element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout"       element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-success"  element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/orders"         element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile"        element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/addresses"      element={<ProtectedRoute><Addresses /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
      </div>

      {!isLoginPage && <Footer />}

      {isAuthenticated && (
        <>
          <button
            id="topBtn"
            title="Go to top"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            data-testid="scroll-to-top-btn"
          >
            ↑
          </button>
          <a
            className="whatsapp-float"
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Order"
            data-testid="whatsapp-float"
          >
            <img src="/assets/icons/whatsapp.svg" alt="WhatsApp" loading="lazy" decoding="async" />
          </a>
        </>
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <CartProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;
