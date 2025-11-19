import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/artworks');
      const data = await response.json();
      
      if (response.ok) {
        setArtworks(data);
      }
    } catch (err) {
      console.error('Error loading artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedArtworks = () => {
    let filtered = artworks.filter(artwork =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'price-low':
        return filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-high':
        return filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return filtered;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Art Gallery</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search artworks, artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Gallery Grid */}
      {filteredAndSortedArtworks().length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No artworks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedArtworks().map((artwork) => (
            <Link 
              key={artwork.id} 
              to={`/artwork/${artwork.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {artwork.image_url && (
                <img 
                  src={artwork.image_url.startsWith('http') ? artwork.image_url : `http://localhost:5001${artwork.image_url}`}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                <Link 
                  to={`/artists/${artwork.user_id}`}
                  className="text-purple-600 hover:text-purple-700 text-sm mb-2 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  by {artwork.username}
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {artwork.description}
                </p>
                {artwork.price && (
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">
                      ${parseFloat(artwork.price).toFixed(2)}
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      View Details
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
