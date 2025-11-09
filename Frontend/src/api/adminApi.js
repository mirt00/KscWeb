// src/api/adminApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/admin";

export const loginAdmin = async (username, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, { username, password });
    localStorage.setItem("adminInfo", JSON.stringify(data)); 
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
