// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(email);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
      <p className="text-gray-500 mb-6 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Send Reset Link
        </button>

        {/* Back to login */}
        <div className="text-sm text-gray-500 text-center mt-2">
          Remembered your password?{' '}
          <Link to="/login" className="hover:underline text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
