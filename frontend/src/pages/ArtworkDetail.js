import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ArtworkDetail({ addToCart, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadArtwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadArtwork = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/artworks/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setArtwork(data);
        setSelectedImage(data.image_url);
      }
    } catch (err) {
      console.error('Error loading artwork:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(artwork);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(artwork);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading artwork...</div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">Artwork not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
            <img 
              src={selectedImage?.startsWith('http') ? selectedImage : `http://localhost:5001${selectedImage}`}
              alt={artwork.title}
              className="w-full h-96 object-contain cursor-zoom-in"
              onClick={() => window.open(selectedImage, '_blank')}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">Click image to view full size</p>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{artwork.title}</h1>
          
          <div className="mb-6">
            <Link 
              to={`/artists/${artwork.user_id}`}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              by {artwork.username || 'Unknown Artist'}
            </Link>
          </div>

          {artwork.price && (
            <div className="text-4xl font-bold text-purple-600 mb-6">
              ${parseFloat(artwork.price).toFixed(2)}
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{artwork.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleBuyNow}
              className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-lg"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border-2 border-purple-600 text-purple-600 py-4 rounded-lg font-semibold hover:bg-purple-50 transition text-lg"
            >
              Add to Cart 🛒
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Artwork Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Created:</span> {new Date(artwork.created_at).toLocaleDateString()}</p>
              <p><span className="font-medium">Category:</span> {artwork.category || 'Original Art'}</p>
              <p><span className="font-medium">Medium:</span> {artwork.medium || 'Mixed Media'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-12">
        <Link 
          to="/gallery" 
          className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          ← Back to Gallery
        </Link>
      </div>
    </div>
  );
}

export default ArtworkDetail;