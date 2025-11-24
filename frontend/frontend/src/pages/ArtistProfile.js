import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtistData();
  }, [id]);

  const loadArtistData = async () => {
    try {
      const artistRes = await fetch(`http://localhost:5001/api/users/${id}`);
      const artistData = await artistRes.json();
      setArtist(artistData);

      const artworksRes = await fetch(`http://localhost:5001/api/artworks?user_id=${id}`);
      const artworksData = await artworksRes.json();
      const filtered = artworksData.filter(art => art.user_id === parseInt(id));
      setArtworks(filtered);
    } catch (err) {
      console.error('Failed to load artist data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading artist profile...</div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Artist not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
            {artist.profile_image_url ? (
              <img 
                src={artist.profile_image_url} 
                alt={artist.username}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-white text-5xl font-bold">
                {artist.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {artist.username}
            </h1>
            
            {artist.location && (
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-2">📍</span>
                <span>{artist.location}</span>
              </div>
            )}

            {artist.bio ? (
              <p className="text-gray-700 text-lg mb-4">
                {artist.bio}
              </p>
            ) : (
              <p className="text-gray-500 italic mb-4">
                This artist hasn't added a bio yet.
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>✉️ {artist.email}</span>
              <span>📅 Joined {new Date(artist.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">
          Artworks by {artist.username} ({artworks.length})
        </h2>

        {artworks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">
              This artist hasn't uploaded any artworks yet.
            </p>
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

      <div className="mt-8">
        <Link 
          to="/artists" 
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          ← Back to All Artists
        </Link>
      </div>
    </div>
  );
}

export default ArtistProfile;