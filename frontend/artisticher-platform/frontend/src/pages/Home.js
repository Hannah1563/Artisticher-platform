import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Welcome to the Art Marketplace</h2>
        <p className="text-lg text-gray-700 mb-4">
          Discover and buy unique artworks from talented artists around the world. 
          Join our community of art lovers and creators.
        </p>
        <Link 
          to="/artists" 
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Explore Artists
        </Link>
      </div>
    </div>
  );
}

export default Home;