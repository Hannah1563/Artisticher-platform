import React, { useEffect, useState } from 'react';
import { getArtists } from '../api';

function ArtistList() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await getArtists();
        // If your backend returns an array directly:
        setArtists(Array.isArray(res.data) ? res.data : []);
        // If your backend returns { artists: [...] }:
        // setArtists(Array.isArray(res.data.artists) ? res.data.artists : []);
      } catch (err) {
        setArtists([]);
      }
    }
    fetchArtists();
  }, []);

  const safeArtists = Array.isArray(artists) ? artists : [];

  return (
    <div>
      {safeArtists.map(artist => (
        <div key={artist.id}>
          {artist.username}
          {/* Render artworks if available */}
          {Array.isArray(artist.artworks) && artist.artworks.length > 0 && (
            <div>
              {artist.artworks.map(artwork => (
                <div key={artwork.id}>
                  <div>{artwork.title}</div>
                  {artwork.image_url && (
                    <img
                      src={`http://localhost:5001${artwork.image_url}`}
                      alt={artwork.title}
                      style={{ width: 200, height: 'auto' }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ArtistList;
