import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🎨 Artisticher</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/learn">Learn Art</Link>
        <Link to="/events">Events</Link>
        <span role="img" aria-label="cart">🛒</span>
      </div>
      <div className="navbar-right">
        <span role="img" aria-label="flag">🇬🇧</span> English
        {user ? (
          <>
            <span className="ml-4 font-semibold">Hi, {user.username}</span>
            <button onClick={handleLogout} className="ml-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="ml-4">Login</Link>
            <Link to="/register" className="ml-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;