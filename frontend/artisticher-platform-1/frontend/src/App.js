import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Artists from './pages/Artists';
import ArtistProfile from './pages/ArtistProfile';
import Gallery from './pages/Gallery';
import AddArtwork from './pages/AddArtwork';
import Events from './pages/Events';
import ProtectedRoute from './components/ProtectedRoute';
import { getCurrentUser } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <Router>
      <Navigation user={user} setUser={setUser} />
      <main className="flex-grow">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" render={(props) => <Login {...props} setUser={setUser} />} />
          <Route path="/register" component={Register} />
          <Route path="/artists" component={Artists} />
          <Route path="/artists/:id" component={ArtistProfile} />
          <Route path="/gallery" component={Gallery} />
          <ProtectedRoute path="/add-artwork" component={AddArtwork} user={user} />
          <Route path="/events" component={Events} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;