import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const VALID_CREDENTIALS = {
  'test': 'test123',
  'test@pk': 'test123',
  'demo': 'test123',
  'admin': 'test123'
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pk_logged_in') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('pk_username') || '';
  });

  const login = (user, pass) => {
    const trimmedUser = user.trim();
    if (VALID_CREDENTIALS[trimmedUser] && VALID_CREDENTIALS[trimmedUser] === pass) {
      localStorage.setItem('pk_logged_in', 'true');
      localStorage.setItem('pk_username', trimmedUser);
      setIsAuthenticated(true);
      setUsername(trimmedUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem('pk_logged_in');
    localStorage.removeItem('pk_username');
    localStorage.removeItem('lastSearch'); // clean search cache as well
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
