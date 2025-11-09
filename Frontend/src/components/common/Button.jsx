// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary' }) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-semibold transition duration-300';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
