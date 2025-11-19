import React from 'react';

function Hero() {
  return (
    <div className="bg-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Art Marketplace</h1>
        <p className="text-lg mb-8">
          Discover and showcase amazing artworks from talented artists around the world.
        </p>
        <a href="/register" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Join Now
        </a>
      </div>
    </div>
  );
}

export default Hero;