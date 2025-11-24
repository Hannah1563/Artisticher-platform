import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { joinEvent } from '../api';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent(data.event || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to join this event');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    setJoining(true);
    setError('');

    try {
      await joinEvent(id);
      setSuccess('✅ Successfully registered for this event!');
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="loading">Loading event...</div>;
  if (error && !event) return <div className="error">{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        {event.image_url && (
          <img src={event.image_url} alt={event.title} className="event-image" />
        )}
        
        <div className="event-content">
          <h1>{event.title}</h1>
          
          <div className="event-meta">
            <p className="event-date">
              📅 {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="event-location">📍 {event.location}</p>
          </div>

          <div className="event-description">
            <h3>About this event</h3>
            <p>{event.description}</p>
          </div>

          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}

          <button 
            onClick={handleJoinEvent} 
            disabled={joining || success}
            className="btn-primary btn-join"
          >
            {joining ? 'Joining...' : success ? 'Already Registered' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;