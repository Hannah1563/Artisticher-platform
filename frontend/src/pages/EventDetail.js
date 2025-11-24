import React, { useEffect, useState } from 'react';
import { getEventById } from '../api';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await getEventById(id);
        const data = res.data || res;
        setEvent(data);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleJoin = async () => {
    // TODO: implement joining logic (e.g. createOrder or /events/:id/join)
    alert('Join event not implemented yet.');
  };

  if (loading) return <div>Loading event...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <button
        onClick={handleJoin}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Join Event
      </button>
    </div>
  );
};

export default EventDetail;
