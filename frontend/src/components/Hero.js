import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing Art
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Connect with talented artists and find unique artworks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/gallery" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Gallery
            </Link>
            <Link 
              to="/artists" 
              className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
            >
              Meet Artists
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;