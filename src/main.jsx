import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global stylesheets
import './styles/style.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/slider.css';
import './styles/responsive.css';
import './styles/products.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
