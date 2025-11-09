// src/App.jsx
import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { LogoProvider } from './context/LogoContext'; // ✅ wrap App with LogoProvider
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LogoProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <AppRouter />
        </LogoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; // ✅ make sure this export exists
