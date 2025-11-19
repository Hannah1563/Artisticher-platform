import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-purple-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Art Marketplace
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/artists" className="text-white hover:text-purple-200">Artists</Link>
          <Link to="/gallery" className="text-white hover:text-purple-200">Gallery</Link>
          <Link to="/events" className="text-white hover:text-purple-200">Events</Link>
          {user ? (
            <>
              <span className="text-white">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="text-white hover:text-purple-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-purple-200">Login</Link>
              <Link to="/register" className="text-white hover:text-purple-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;