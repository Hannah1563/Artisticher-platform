import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navigation({ user, setUser, cartCount }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎨 Artisticher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/artists" className="text-gray-700 hover:text-purple-600 font-medium">
              {t('nav.artists')}
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-purple-600 font-medium">
              {t('nav.gallery')}
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-medium">
              {t('nav.learnArt')}
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-purple-600 font-medium">
              {t('nav.events')}
            </Link>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-purple-600">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  {t('nav.dashboard')}
                </Link>
                <Link 
                  to="/my-orders" 
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  {t('nav.myOrders')}
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">👤 {user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.home')}</Link>
              <Link to="/artists" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.artists')}</Link>
              <Link to="/gallery" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.gallery')}</Link>
              <Link to="/courses" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.learnArt')}</Link>
              <Link to="/events" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.events')}</Link>
              
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.dashboard')}</Link>
                  <Link to="/my-orders" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.myOrders')}</Link>
                  <button onClick={handleLogout} className="text-red-600 text-left py-2">{t('nav.logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-purple-600 py-2">{t('nav.login')}</Link>
                  <Link to="/register" className="text-purple-600 py-2">{t('nav.register')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;