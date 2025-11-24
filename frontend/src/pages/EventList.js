import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await getAllEvents();
        const data = res.data || res;
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border rounded p-4">
              <h2 className="font-semibold text-lg">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;