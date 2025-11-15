const API_URL = "http://localhost:5001/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchArtworks = async () => {
  const res = await fetch(`${API_URL}/artworks`);
  return res.json();
};

export const addArtwork = async (formData) => {
  const res = await fetch(`${API_URL}/artworks`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

export const deleteArtwork = async (id) => {
  const res = await fetch(`${API_URL}/artworks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};