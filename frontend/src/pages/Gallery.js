import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllArtworks } from '../api';

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    getAllArtworks()
      .then(res => setArtworks(Array.isArray(res.data.artworks) ? res.data.artworks : []))
      .catch(() => setArtworks([]));
  }, []);

  const handleDelete = async (artworkId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5001/api/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtworks(artworks.filter(a => a.id !== artworkId));
    } catch (err) {
      alert('Failed to delete artwork.');
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
      gap: '32px',
      padding: '32px',
      background: '#f8f8fa',
      minHeight: '100vh'
    }}>
      {artworks.length === 0 && <div>No artworks found.</div>}
      {artworks.map(artwork => {
        console.log('Current user id:', user.id, 'Artwork user_id:', artwork.user_id);
        return (
          <div
            key={artwork.id}
            className="artwork-card"
            style={{
              border: 'none',
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(160,89,207,0.08), 0 1.5px 6px #eee',
              padding: 0,
              background: '#fff',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: 410,
              transition: 'transform 0.15s, box-shadow 0.15s',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/artworks/${artwork.id}`)}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
          >
            <img
              src={`http://localhost:5001${artwork.image_url}`}
              alt={artwork.title}
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                background: '#eee'
              }}
            />
            <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: 18,
                color: '#222',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {artwork.title}
              </h3>
              <p style={{
                color: '#555',
                fontSize: 14,
                marginBottom: 8,
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {artwork.description}
              </p>
              <div style={{ fontSize: 15, color: '#a259cf', fontWeight: 600, marginBottom: 6 }}>
                Price: {artwork.price} RWF
              </div>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>
                Artist: {artwork.artist_name || artwork.artist?.username || 'Unknown'}
              </div>
              <button
                style={{
                  background: 'linear-gradient(90deg,#a259cf 60%,#6e56cf 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 0',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  marginTop: 'auto',
                  boxShadow: '0 2px 8px #e5d6f7'
                }}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/artworks/${artwork.id}`);
                }}
              >
                👁️ View Details
              </button>
              {user && user.id && String(user.id) === String(artwork.user_id) && (
                <button
                  style={{
                    background: '#fff',
                    color: '#c00',
                    border: '1px solid #c00',
                    borderRadius: 8,
                    padding: '8px 0',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    marginTop: 8
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this artwork?')) {
                      handleDelete(artwork.id);
                    }
                  }}
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
