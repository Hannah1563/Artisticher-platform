import React, { useEffect, useState } from 'react';
import { getAllArtworks } from '../api';

const Marketplace = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const res = await getAllArtworks();
        const data = res.data || res;
        setArtworks(data);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      {artworks.length === 0 ? (
        <p>No artworks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div key={art.id} className="bg-white rounded shadow p-4">
              <img
                src={art.image_url}
                alt={art.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="font-semibold text-lg mb-1">{art.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {art.description}
              </p>
              <div className="font-bold text-purple-600">
                ${art.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;