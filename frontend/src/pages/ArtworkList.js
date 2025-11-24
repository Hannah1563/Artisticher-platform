import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../api';
import './ArtistList.css';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const res = await getArtists();
        const data = res.data || res;
        setArtists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) return <div className="loading">Loading artists...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="artist-list-container">
      <h1>Featured Artists</h1>
      
      {artists.length === 0 ? (
        <div className="no-artists">
          <p>No artists available at the moment</p>
        </div>
      ) : (
        <div className="artist-grid">
          {artists.map(artist => (
            <Link to={`/artists/${artist.id}`} key={artist.id} className="artist-card">
              <div className="artist-avatar">
                {artist.profile_image ? (
                  <img src={artist.profile_image} alt={artist.username} />
                ) : (
                  <div className="avatar-placeholder">
                    {artist.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="artist-info">
                <h3>{artist.username}</h3>
                <p className="artist-email">✉️ {artist.email}</p>
                {artist.bio && <p className="artist-bio">{artist.bio}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistList;