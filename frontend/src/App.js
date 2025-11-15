import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="text-2xl font-bold text-purple-600">
                ArtisticHer
              </Link>
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2">
                  Home
                </Link>
                <Link to="/gallery" className="text-gray-700 hover:text-purple-600 px-3 py-2">
                  Gallery
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-purple-600 px-3 py-2">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;