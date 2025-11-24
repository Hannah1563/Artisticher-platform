import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArtwork } from '../api';
import './Auth.css';

function AddArtwork() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔒 Protect page - only logged in users can access
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to add artworks');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      // We don't use the response, so no need to assign it
      await createArtwork(payload);

      navigate('/artworks');
    } catch (err) {
      console.error('Add artwork error:', err);
      setError(
        err?.error ||
        err?.message ||
        'Failed to add artwork. Please try again.'
      );
    } finally {
      setLoading(false);
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

        <form onSubmit={handleSubmit} className="auth-form">
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
            <label htmlFor="price">Price (USD) *</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="100.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL *</label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              required
              placeholder="https://example.com/your-artwork.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="painting, sculpture, digital, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
