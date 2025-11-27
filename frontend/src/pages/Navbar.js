function Navbar() {
  return (
    <nav>
      <div>DEBUG: This is the Navbar in /src/pages/Navbar.js</div>
      <a href="/gallery">Gallery</a>
      <a href="/learn-art">Learn Art</a>
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
    </nav>
  );
}

export default Navbar;