// src/services/api.jsx
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api'; // Change to your actual backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Set Authorization token dynamically
 * @param {string} token - JWT token
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Auth APIs
 */
export const loginUser = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

export const registerUser = async (userData) => {
  return await api.post('/auth/register', userData);
};

export const forgotPassword = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

/**
 * Courses APIs
 */
export const getCourses = async () => {
  return await api.get('/courses');
};

/**
 * Notices APIs
 */
export const getNotices = async () => {
  return await api.get('/notices');
};

/**
 * Admin Dashboard APIs
 */
export const getDashboardStats = async () => {
  return await api.get('/admin/dashboard-stats');
};

export const getAnalyticsData = async () => {
  return await api.get('/admin/analytics');
};

/**
 * Generic GET request
 */
export const fetchData = async (endpoint) => {
  return await api.get(endpoint);
};

/**
 * Generic POST request
 */
export const postData = async (endpoint, payload) => {
  return await api.post(endpoint, payload);
};

export default api;
