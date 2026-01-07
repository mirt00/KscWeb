// src/App.jsx
import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LogoProvider } from './context/LogoContext'; // ✅ wrap App with LogoProvider

// ✅ Import React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LogoProvider>
          {/* ✅ Toastify container */}
          <ToastContainer 
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover
          />
          <AppRouter />
        </LogoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
