import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to ArtisticHer</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A platform celebrating female artists. Showcase your art, connect, and grow.
        </p>
        <div className="space-x-4">
          <Link 
            to="/register" 
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Join as Artist
          </Link>
          <Link 
            to="/gallery" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 inline-block"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;