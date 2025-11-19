import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addArtwork } from '../api';

function AddArtwork() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: ''
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user_id = localStorage.getItem('userId');

    const artworkData = new FormData();
    artworkData.append('title', formData.title);
    artworkData.append('description', formData.description);
    artworkData.append('price', formData.price);
    artworkData.append('image_url', formData.image_url);
    artworkData.append('user_id', user_id);

    try {
      await addArtwork(artworkData);
      alert('Artwork added successfully!');
      navigate('/gallery');
    } catch (err) {
      console.error(err);
      setError('Failed to add artwork');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add Your Artwork</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image_url"
              required
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste an image URL for now. File upload coming soon.
            </p>
          </div>

          {formData.image_url && (
            <div>
              <label className="block text-sm font-medium mb-1">Preview</label>
              <img 
                src={formData.image_url} 
                alt="Preview"
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Adding Artwork...' : 'Add Artwork'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtwork;
