import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../api';
import './ArtistDetail.css';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const userData = await getUserById(id);
        setArtist(userData.user || userData);

        // Fetch artist's artworks
        const artworksRes = await fetch(`http://localhost:5001/api/artworks`);
        const artworksData = await artworksRes.json();
        const artistArtworks = (artworksData.artworks || artworksData).filter(
          artwork => artwork.artist_id === parseInt(id)
        );
        setArtworks(artistArtworks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArtist();
  }, [id]);

  if (loading) return <div className="loading">Loading artist profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!artist) return <div>Artist not found</div>;

  return (
    <div className="artist-detail-container">
      <div className="artist-header">
        <div className="artist-avatar-large">
          {artist.profile_image ? (
            <img src={artist.profile_image} alt={artist.username} />
          ) : (
            <div className="avatar-placeholder-large">
              {artist.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="artist-header-info">
          <h1>{artist.username}</h1>
          <p className="artist-email">✉️ {artist.email}</p>
          {artist.bio && <p className="artist-bio">{artist.bio}</p>}
        </div>
      </div>

      <div className="artist-artworks">
        <h2>Artworks by {artist.username}</h2>
        
        {artworks.length === 0 ? (
          <p>No artworks yet</p>
        ) : (
          <div className="artwork-grid">
            {artworks.map(artwork => (
              <Link to={`/artworks/${artwork.id}`} key={artwork.id} className="artwork-card">
                <img src={artwork.image_url} alt={artwork.title} />
                <div className="artwork-info">
                  <h3>{artwork.title}</h3>
                  <p className="price">{parseFloat(artwork.price).toLocaleString()} RWF</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
