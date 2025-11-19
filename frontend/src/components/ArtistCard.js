import React from 'react';
import { Link } from 'react-router-dom';

function ArtistCard({ artist }) {
  return (
    <Link 
      to={`/artists/${artist.id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        {artist.profile_image_url ? (
          <img 
            src={artist.profile_image_url} 
            alt={artist.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white text-6xl font-bold">
            {artist.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{artist.username}</h3>
        {artist.location && (
          <p className="text-gray-600 text-sm mb-2">📍 {artist.location}</p>
        )}
        {artist.bio && (
          <p className="text-gray-700 text-sm line-clamp-2">{artist.bio}</p>
        )}
      </div>
    </Link>
  );
}

export default ArtistCard;