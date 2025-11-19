// ===============================
// ArtisticHer Frontend API File
// ===============================

const API_URL = "http://localhost:5001/api";

//
// -----------------------
// USER AUTHENTICATION
// -----------------------
//

// Register User
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Login User
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

//
// -----------------------
// ARTISTS (NEW SECTION)
// -----------------------
//

// Fetch all artists
export const fetchArtists = async () => {
  try {
    const response = await fetch(`${API_URL}/users/artists`);
    if (!response.ok) throw new Error("Failed to fetch artists");
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//
// -----------------------
// ARTWORKS
// -----------------------
//

// Fetch all artworks
export const fetchArtworks = async () => {
  const res = await fetch(`${API_URL}/artworks`);
  return res.json();
};

// Add new artwork (formData because it may contain images)
export const addArtwork = async (formData) => {
  const res = await fetch(`${API_URL}/artworks`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Delete artwork
export const deleteArtwork = async (id) => {
  const res = await fetch(`${API_URL}/artworks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

//
// -----------------------
// EVENTS
// -----------------------
//

// Fetch list of events
export const fetchEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
};

// Join an event
export const joinEvent = async (eventId, artistId) => {
  const res = await fetch(`${API_URL}/events/${eventId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artist_id: artistId }),
  });
  return res.json();
};

//
// -----------------------
// ENGAGEMENT (Likes, Views…)
// -----------------------
//

// Like an artwork
export const likeArtwork = async (artworkId) => {
  const res = await fetch(`${API_URL}/engagement/${artworkId}/like`, {
    method: "POST",
  });
  return res.json();
};

//
// -----------------------
// SALES / TRANSACTIONS
// -----------------------
//

// Create a sale (buyer buys an artwork)
export const createSale = async (saleData) => {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(saleData),
  });
  return res.json();
};
