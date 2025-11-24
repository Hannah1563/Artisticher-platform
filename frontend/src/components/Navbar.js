import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎨 Artisticher</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/artists">Artists</Link>
            <Link to="/artworks">Gallery</Link>
            <Link to="/events">Events</Link>
            {user?.role === 'artist' && (
              <Link to="/artworks/add" className="btn-add-artwork">+ Add Artwork</Link>
            )}
            <Link to="/cart">🛒 Cart</Link>
            <Link to="/orders">My Orders</Link>
            <span className="user-name">👤 {user?.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </>
        )}
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="mr-2">Hi, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;