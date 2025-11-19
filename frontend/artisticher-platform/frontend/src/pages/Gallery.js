import React, { useState, useEffect } from 'react';

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/artworks');
      const data = await response.json();
      setArtworks(data);
    } catch (err) {
      console.error('Failed to load artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Artwork Gallery</h1>
      {artworks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No artworks available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {artwork.image_url && (
                <img 
                  src={artwork.image_url.startsWith('http') ? artwork.image_url : `http://localhost:5001${artwork.image_url}`}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {artwork.description}
                </p>
                {artwork.price && (
                  <div className="text-lg font-bold text-purple-600">
                    ${parseFloat(artwork.price).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;