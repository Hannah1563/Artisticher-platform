// src/pages/Artists.js
import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/artists');
      const data = await response.json();

      if (response.ok) {
        setArtists(data);
      } else {
        setError('Failed to load artists');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error loading artists:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading artists...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Talented Artists</h1>
        <p className="text-xl text-gray-600">
          Browse through {artists.length} amazing artists from around the world
        </p>
      </div>

      {artists.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No artists found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;
