import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎨 Artisticher
            </h3>
            <p className="text-gray-400">
              Connecting artists with art lovers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/artists" className="text-gray-400 hover:text-purple-400">Artists</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-purple-400">Gallery</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-purple-400">Events</Link></li>
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Artists</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-400 hover:text-purple-400">Join Us</Link></li>
              <li><Link to="/add-artwork" className="text-gray-400 hover:text-purple-400">Upload Art</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@artisticher.com</li>
              <li>📱 +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Artisticher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;