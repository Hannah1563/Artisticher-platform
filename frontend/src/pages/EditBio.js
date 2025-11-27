import React, { useState, useEffect } from 'react';
import { updateBio, getBio } from '../api';

const EditBio = (props) => {
  const user = props.user || JSON.parse(localStorage.getItem('user') || '{}');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.id) {
      getBio(user.id)
        .then(res => setBio(typeof res.data.bio === 'string' ? res.data.bio : ''))
        .catch(() => setBio(typeof user.bio === 'string' ? user.bio : ''));
    }
  }, [user]);

  if (!user || user.role !== 'artist') {
    return <div style={{ padding: 32 }}>You are not allowed to edit the bio.</div>;
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateBio(user.id, bio, token);
      setMessage('Bio updated!');
      user.bio = bio;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setMessage('Failed to update bio.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #eee', padding: 32 }}>
      <h2>Edit Your Bio</h2>
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        rows={6}
        style={{ width: '100%', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16 }}
        placeholder="Tell people about your art, your story, and what you offer..."
      />
      <button
        onClick={handleSave}
        style={{
          background: '#a259cf',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Save Bio
      </button>
      {message && <div style={{ color: message === 'Bio updated!' ? 'green' : 'red', marginTop: 12 }}>{message}</div>}
    </div>
  );
};

export default EditBio;