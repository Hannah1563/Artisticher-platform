import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api';

const Events = () => {
  const [events, setEvents] = useState([]);  // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await getAllEvents();
        const data = res.data || res;

        // Normalize various possible shapes to a single array
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data.events)) {
          list = data.events;
        } else if (Array.isArray(data.data)) {
          list = data.data;
        }

        setEvents(list);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error}</div>;

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <p>No events found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border rounded p-4">
            <h2 className="font-semibold text-lg">{event.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {event.description}
            </p>
            <p className="text-xs text-gray-500">
              {event.start_date || event.date} — {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
