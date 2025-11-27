// filepath: /Users/jeanbaptistetuyishimire/Artisticher-platform/frontend/src/App.js
import LearnArt from './pages/LearnArt'; // adjust path if needed
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistDashboard from './pages/ArtistDashboard';
import ArtistProfile from './pages/ArtistProfile';
import Artists from './pages/Artists';
import ArtworkDetail from './pages/ArtworkDetail';
import ArtworkList from './pages/ArtworkList';
import AddArtwork from './pages/AddArtwork';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Events from './pages/Events';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import ArtworkDetails from './pages/ArtworkDetails';// You can remove this import if you are not using <ArtworkDetail />
import PaymentCallback from './pages/PaymentCallback';
import EditBio from './pages/EditBio';

import './i18n';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load user from localStorage on app start
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (artwork) => {
   const existingItem = cart.find(item => item.id === artwork.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === artwork.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...artwork, quantity: 1 }]);
    }
  };

  const removeFromCart = (artworkId) => {
    setCart(cart.filter(item => item.id !== artworkId));
  };

  const updateQuantity = (artworkId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
    } else {
      setCart(cart.map(item =>
        item.id === artworkId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation user={user} setUser={setUser} cartCount={cart.length} />
          <main className="flex-grow">
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/gallery" element={<Gallery />} />

              {/* Auth */}
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />

              {/* Artists & artworks */}
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
              <Route path="/artworks" element={<ArtworkList />} />
              <Route path="/artworks/:id" element={<ArtworkDetails />} />
              <Route path="/dashboard" element={<ArtistDashboard user={user} />} />
              <Route
                path="/add-artwork"
                element={<AddArtwork user={user} />}
              />

              {/* Cart / orders / checkout */}
              <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
              <Route
                path="/checkout"
                element={<Checkout cart={cart} user={user} clearCart={clearCart} />}
              />
              <Route path="/my-orders" element={<MyOrders user={user} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<Order />} />

              {/* Courses */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail user={user} />} />

              {/* Events */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/list" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetail />} />

              {/* Payments */}
              <Route path="/payment/callback" element={<PaymentCallback />} />

              {/* Edit Bio */}
              <Route path="/edit-bio" element={<EditBio />} />

              {/* Learn Art */}
              <Route path="/learn" element={<LearnArt />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;