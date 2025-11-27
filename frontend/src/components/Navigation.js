import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = ({ user, setUser, cartCount }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 32px',
      background: '#fff',
      borderBottom: '1px solid #eee'
    }}>
      {/* Left-side navigation */}
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" className="logo" style={{ fontWeight: 'bold', fontSize: '22px', color: '#a259cf', marginRight: '32px', textDecoration: 'none' }}>
          <span role="img" aria-label="logo">🎨</span> Artisticher
        </Link>
        <Link to="/" style={{ marginRight: '16px', textDecoration: 'none', color: '#222' }}>{t('home')}</Link>
        <Link to="/artists" style={{ marginRight: '16px', textDecoration: 'none', color: '#222' }}>{t('artists')}</Link>
        <Link to="/gallery" style={{ marginRight: '16px', textDecoration: 'none', color: '#222' }}>{t('gallery')}</Link>
        <Link to="/learn" style={{ marginRight: '16px', textDecoration: 'none', color: '#222' }}>{t('learnArt')}</Link>
        <Link to="/events" style={{ marginRight: '16px', textDecoration: 'none', color: '#222' }}>{t('events')}</Link>
      </div>
      {/* Right-side navigation */}
      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Language dropdown */}
        <select
          value={localStorage.getItem('lang') || 'en'}
          onChange={e => {
            localStorage.setItem('lang', e.target.value);
            window.location.reload();
          }}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px' }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="rw">🇷🇼 Kinyarwanda</option>
          <option value="sw">🇰🇪 Kiswahili</option>
        </select>
        {/* Cart icon with badge */}
        <Link to="/cart" style={{ position: 'relative', marginRight: '12px', color: '#222' }}>
          <span role="img" aria-label="cart" style={{ fontSize: '22px' }}>🛒</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-10px',
              background: '#a259cf',
              color: '#fff',
              borderRadius: '50%',
              fontSize: '12px',
              padding: '2px 6px'
            }}>{cartCount}</span>
          )}
        </Link>
        {/* User actions */}
        {user ? (
          <>
            <span style={{ fontWeight: '600', color: '#222' }}>Hi, {user.username || user.email}</span>
            <Link to="/edit-bio" style={{ color: '#a259cf', textDecoration: 'none' }}>{t('editBio')}</Link>
            {(JSON.parse(localStorage.getItem('user'))?.role === 'artist') && (
              <a
                href="/add-artwork"
                style={{
                  marginLeft: 16,
                  background: '#a259cf',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Add Artwork
              </a>
            )}
            <button onClick={handleLogout} style={{
              background: 'none',
              border: 'none',
              color: '#c00',
              cursor: 'pointer',
              fontWeight: '500'
            }}>{t('logout')}</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#222', textDecoration: 'none' }}>{t('login')}</Link>
            <Link to="/register" style={{
              background: '#a259cf',
              color: '#fff',
              borderRadius: '6px',
              padding: '6px 16px',
              marginLeft: '4px',
              textDecoration: 'none'
            }}>{t('register')}</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;