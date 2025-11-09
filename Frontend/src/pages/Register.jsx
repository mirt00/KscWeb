// src/pages/Register.jsx
import React, { useContext } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    // You can call API here to register
    login(userData); // log in immediately after register
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Header />
      <main className="pt-20 container mx-auto px-4 py-10">
        <RegisterForm onSubmit={handleRegister} />
      </main>
      <Footer />
    </>
  );
};

export default Register;
