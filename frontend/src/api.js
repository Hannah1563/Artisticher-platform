import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

// Register user
export const register = (payload) =>
  axios.post(`${API_BASE_URL}/api/auth/register`, payload);

// Login user
export const login = (payload) =>
  axios.post(`${API_BASE_URL}/api/auth/login`, payload);

// Get all artists
export const getArtists = () =>
  axios.get(`${API_BASE_URL}/api/users/artists`);

// Get all artworks
export const getAllArtworks = () =>
  axios.get(`${API_BASE_URL}/api/artworks`);

// Get all events
export const getAllEvents = () =>
  axios.get(`${API_BASE_URL}/api/events`);

// Get a user's bio
export const getBio = (userId) =>
  axios.get(`${API_BASE_URL}/api/users/${userId}/bio`);

// Update a user's bio (requires auth token)
export const updateBio = (userId, bio, token) =>
  axios.put(`${API_BASE_URL}/api/users/${userId}/bio`, { bio }, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Get event by ID
export const getEventById = (eventId) =>
  axios.get(`${API_BASE_URL}/api/events/${eventId}`);

// Create artwork
export const createArtwork = (formData, token) =>
  axios.post(`${API_BASE_URL}/api/artworks`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

// Create order
export const createOrder = (payload, token) =>
  axios.post(`${API_BASE_URL}/api/orders`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Get user orders
export const getUserOrders = (token) =>
  axios.get(`${API_BASE_URL}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getArtworkById = (id) =>
  axios.get(`${API_BASE_URL}/api/artworks/${id}`);

