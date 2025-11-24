import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // This must match your backend port

export const register = (payload) =>
  axios.post(`${API_BASE_URL}/api/auth/register`, payload);

export const login = (payload) =>
  axios.post(`${API_BASE_URL}/api/auth/login`, payload);

export const getArtists = () =>
  axios.get(`${API_BASE_URL}/api/users/artists`);

export const getAllArtworks = () =>
  axios.get(`${API_BASE_URL}/api/artworks`);

export const getAllEvents = () =>
  axios.get(`${API_BASE_URL}/api/events`);

export const getEventById = (eventId) =>
  axios.get(`${API_BASE_URL}/api/events/${eventId}`);

export const createArtwork = (payload, token) =>
  axios.post(`${API_BASE_URL}/api/artworks`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createOrder = (payload, token) =>
  axios.post(`${API_BASE_URL}/api/orders`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getUserOrders = (token) =>
  axios.get(`${API_BASE_URL}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// filepath: /Users/jeanbaptistetuyishimire/Artisticher-platform/backend/server.js

