// src/pages/Artists.js
import React, { useEffect, useState } from 'react';
import { getArtists } from '../api';

const Artists = () => {
  const [artists, setArtists] = useState([]);    // always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const res = await getArtists();
        const data = res.data || res;

        // Normalize various shapes to a single array
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data.artists)) {
          list = data.artists;
        } else if (Array.isArray(data.data)) {
          list = data.data;
        }

        setArtists(list);
      } catch (err) {
        console.error('Error loading artists:', err);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) {
    return <div>Loading artists...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Discover Talented Artists</h1>
      <p className="mb-6 text-gray-600">
        Browse through {artists.length} amazing artists from around the world
      </p>

      {artists.length === 0 ? (
        <div>No artists found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded shadow p-4">
              <h2 className="font-semibold text-lg mb-1">
                {artist.username || artist.name}
              </h2>
              <p className="text-sm text-gray-600">
                {artist.bio || 'No bio available.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;
