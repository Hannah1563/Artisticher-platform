import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add these states for editing bio
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isOwnProfile = user && String(user._id) === String(id); // Ensure both are strings

  useEffect(() => {
    const loadArtistData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/users/${id}`);
        const data = await response.json();
        setArtist(data);
        setBioInput(data.bio || '');
      } catch (error) {
        console.error('Error loading artist:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtistData();
  }, [id]);

  const handleSaveBio = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/users/${id}/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ bio: bioInput }),
      });
      if (res.ok) {
        setArtist(prev => ({ ...prev, bio: bioInput }));
        setEditingBio(false);
      } else {
        alert('Failed to update bio.');
      }
    } catch {
      alert('Failed to update bio.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Artist not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Artist Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={artist.profile_image || 'https://via.placeholder.com/200'}
            alt={artist.username}
            className="w-48 h-48 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{artist.username}</h1>
            <p className="text-gray-600 mb-4">{artist.email}</p>
            {/* Bio Section */}
            {!editingBio ? (
              <>
                <p className="text-gray-700 mb-4">{artist.bio || 'No bio available'}</p>
                {isOwnProfile && (
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    onClick={() => setEditingBio(true)}
                  >
                    Edit Bio
                  </button>
                )}
              </>
            ) : (
              <div className="mb-4">
                <textarea
                  value={bioInput}
                  onChange={e => setBioInput(e.target.value)}
                  className="w-full min-h-[100px] p-2 border border-purple-400 rounded mb-2"
                  placeholder="Write something about yourself..."
                />
                <div className="flex gap-2">
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    onClick={handleSaveBio}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => {
                      setEditingBio(false);
                      setBioInput(artist.bio || '');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="flex gap-4 text-sm text-gray-600">
              <span>📅 Joined: {new Date(artist.created_at).toLocaleDateString()}</span>
              <span>🎨 Artworks: {artist.artworks?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artist's Artworks */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Artworks by {artist.username}</h2>
        {artist.artworks && artist.artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.artworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{artwork.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">
                      ${artwork.price}
                    </span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">This artist hasn't uploaded any artworks yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistProfile;