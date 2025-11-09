// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ email, password });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
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

        {/* Password */}
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Login
        </button>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-500">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
