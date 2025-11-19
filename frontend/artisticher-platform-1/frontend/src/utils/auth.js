import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Logout a user
export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Get the current user from the token
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }
  return null;
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};