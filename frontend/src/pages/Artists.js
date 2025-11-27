// src/pages/Artists.js
import React, { useEffect, useState } from 'react';
import { getArtists } from '../api';
import { useTranslation } from 'react-i18next';

const Artists = () => {
  const [artists, setArtists] = useState([]);    // always array
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
    <div>
      <section
        style={{
          background: 'linear-gradient(90deg, #a259cf 0%, #f7b801 100%)',
          color: '#fff',
          padding: '48px 0 32px 0',
          textAlign: 'center',
          marginBottom: '32px',
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 2px 16px #e0e0e0'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {t('artists.title') || 'Artists'}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.92 }}>
          {t('artists.subtitle') || 'Browse through amazing artists from around the world'}
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
    </div>
  );
};

export default Artists;
