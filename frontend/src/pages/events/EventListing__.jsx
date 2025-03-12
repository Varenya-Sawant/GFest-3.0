import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventListing__.css';

/* 
{
    event_id: 1,
    event_name: 'TestN',
    event_description: 'Desc',
    event_location_address: "pan",
    event_start_timestamp: 'Mon Mar 10 2025 12:46:46 GMT+0530 (India Standard Time)',
    event_end_timestamp: 'Mon Mar 10 2025 12:46:46 GMT+0530 (India Standard Time)'
  }
 */

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        console.log(response);
        setEvents(response.data);
      } catch (err) {
        setError('No events');
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-listing">
      <h2>Upcoming Events</h2>
      {error && <p className="error">{error}</p>}
      <div className="event-grid">
        { 
        events.length <= 0 
        ? 'No events'
        : events.map((event) => {
          
          
        return  (
          <div className="event-card">
            <h3>{event.event_name}</h3>
            <p>Event start: {new Date(event.event_start_timestamp).toLocaleString()}</p>
            <p>Event end: {new Date(event.event_end_timestamp).toLocaleString()}</p>
            <p>Address: {event.event_location_address}</p>
            <p>{event.event_description.substring(0, 100)}...</p>
          </div>
        )})
      }
      </div>
    </div>
  );
};

export default EventListing;