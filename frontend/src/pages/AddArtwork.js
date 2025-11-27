import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArtwork } from '../api';
import './Auth.css';

function AddArtwork() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    price: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // You can use this if you want loading state

  // 🔒 Protect page - only logged in users can access
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Please login to add artworks');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price); // <-- Make sure this is included!
    data.append('image', formData.image);

    try {
      await createArtwork(data, token);
      setLoading(false);
      navigate('/gallery'); // Redirect to gallery or show a success message
    } catch (err) {
      setError('Failed to add artwork.');
      setLoading(false);
      console.error('Artwork upload error:', err?.response?.data || err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Add New Artwork</h2>
          <p>Share your art with the community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Artwork title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your artwork"
              style={{
                minHeight: '100px',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image *</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (RWF) *</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price || ''}
              onChange={handleChange}
              required
              placeholder="Enter price in RWF"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'loading' : ''} w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 disabled:opacity-50`}
          >
            {loading ? 'Adding...' : 'Add Artwork'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtwork;
