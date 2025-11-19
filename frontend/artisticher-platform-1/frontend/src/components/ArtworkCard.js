import React from 'react';
import { Link } from 'react-router-dom';

function ArtworkCard({ artwork }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
        <Link 
          to={`/artworks/${artwork.id}`} 
          className="inline-block mt-2 text-purple-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ArtworkCard;