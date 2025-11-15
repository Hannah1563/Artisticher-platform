import React, { useState, useEffect } from 'react';
import { fetchArtworks, deleteArtwork } from '../api';

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const data = await fetchArtworks();
      setArtworks(data);
    } catch (err) {
      setError('Failed to load artworks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArtwork(id);
        loadArtworks(); // Reload artworks
      } catch (err) {
        alert('Failed to delete artwork');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading artworks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Art Gallery</h1>

      {artworks.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">No artworks yet. Be the first to add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <div key={art.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {art.image_url && (
                <img 
                  src={`http://localhost:5001${art.image_url}`} 
                  alt={art.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{art.title}</h3>
                <p className="text-gray-600 mb-4">{art.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(art.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(art.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;