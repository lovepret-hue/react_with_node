import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api', // Your Node backend URL
  withCredentials: true, // optional: if using cookies
});

// Automatically attach token from localStorage (if exists)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
