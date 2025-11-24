import React, { useEffect, useState, useMemo } from 'react';
import { getAllArtworks } from '../api';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);   // always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const res = await getAllArtworks();
        const data = res.data || res;

        // Normalize API response to an array
        let list = [];
        if (data && data.success && Array.isArray(data.artworks)) {
          // backend: { success: true, artworks: [...] }
          list = data.artworks;
        } else if (Array.isArray(data)) {
          // backend: [...direct array...]
          list = data;
        } else if (data && Array.isArray(data.data)) {
          // backend: { data: [...] }
          list = data.data;
        }

        setArtworks(list);
      } catch (err) {
        console.error('Error loading artworks for gallery:', err);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  const filteredAndSortedArtworks = useMemo(() => {
    if (!Array.isArray(artworks)) return [];
    // If you had more complex filter/sort, keep it here.
    // Simple: newest first by created_at
    return [...artworks].sort((a, b) => {
      const da = new Date(a.created_at || 0).getTime();
      const db = new Date(b.created_at || 0).getTime();
      return db - da;
    });
  }, [artworks]);

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Art Gallery</h1>
      <p className="mb-6 text-gray-600">Search artworks, artists...</p>

      {filteredAndSortedArtworks.length === 0 ? (
        <div>No artworks found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAndSortedArtworks.map((art) => (
            <div key={art.id} className="bg-white rounded shadow p-4">
              {art.image_url && (
                <img
                  src={art.image_url}
                  alt={art.title}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h2 className="font-semibold text-lg mb-1">{art.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {art.description}
              </p>
              {art.price != null && (
                <p className="mt-2 font-semibold">
                  ${Number(art.price).toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
