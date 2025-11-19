import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ArtistDashboard({ user }) {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalSales: 0,
    totalRevenue: 0,
    views: 0
  });
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadArtistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadArtistData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/artworks?userId=${user.userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setArtworks(data);
        
        // Calculate stats
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const artistSales = orders.filter(order => 
          order.items.some(item => item.user_id === user.userId)
        );
        
        let totalRevenue = 0;
        let totalSales = 0;
        artistSales.forEach(order => {
          order.items.forEach(item => {
            if (item.user_id === user.userId) {
              totalRevenue += parseFloat(item.price) * item.quantity;
              totalSales += item.quantity;
            }
          });
        });

        setStats({
          totalArtworks: data.length,
          totalSales: totalSales,
          totalRevenue: totalRevenue,
          views: data.length * 150 // Simulated views
        });
      }
    } catch (err) {
      console.error('Error loading artist data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artworkId) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5001/api/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Artwork deleted successfully!');
        loadArtistData();
      } else {
        alert('Failed to delete artwork');
      }
    } catch (err) {
      console.error('Error deleting artwork:', err);
      alert('Error deleting artwork');
    }
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5001/api/artworks/${editingArtwork.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingArtwork)
      });

      if (response.ok) {
        alert('Artwork updated successfully!');
        setEditingArtwork(null);
        loadArtistData();
      } else {
        alert('Failed to update artwork');
      }
    } catch (err) {
      console.error('Error updating artwork:', err);
      alert('Error updating artwork');
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Artist Dashboard</h1>
        <Link 
          to="/add-artwork"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
        >
          + Upload New Artwork
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Artworks</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalArtworks}</p>
            </div>
            <div className="text-4xl">🎨</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalSales}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-600">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Views</p>
              <p className="text-3xl font-bold text-orange-600">{stats.views}</p>
            </div>
            <div className="text-4xl">👁️</div>
          </div>
        </div>
      </div>

      {/* Artworks Management */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Artworks</h2>

        {artworks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-600 text-lg mb-4">You haven't uploaded any artworks yet</p>
            <Link 
              to="/add-artwork"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 inline-block"
            >
              Upload Your First Artwork
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img 
                        src={artwork.image_url?.startsWith('http') ? artwork.image_url : `http://localhost:5001${artwork.image_url}`}
                        alt={artwork.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{artwork.title}</td>
                    <td className="py-3 px-4">${parseFloat(artwork.price).toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(artwork.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(artwork)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(artwork.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/artwork/${artwork.id}`}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Artwork</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingArtwork.title}
                  onChange={(e) => setEditingArtwork({...editingArtwork, title: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={editingArtwork.description}
                  onChange={(e) => setEditingArtwork({...editingArtwork, description: e.target.value})}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  value={editingArtwork.price}
                  onChange={(e) => setEditingArtwork({...editingArtwork, price: e.target.value})}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={editingArtwork.image_url}
                  onChange={(e) => setEditingArtwork({...editingArtwork, image_url: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {editingArtwork.image_url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <img 
                    src={editingArtwork.image_url}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingArtwork(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Management Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
        <div className="space-y-4">
          <Link 
            to={`/artists/${user.userId}`}
            className="block bg-purple-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 text-center font-semibold"
          >
            View My Public Profile
          </Link>
          <button 
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-semibold"
            onClick={() => alert('Profile editing coming soon!')}
          >
            Edit Profile Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;