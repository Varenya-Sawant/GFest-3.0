import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router'; // Import Link for navigation
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; // Import the map components from react-leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './EventListing.css';

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
        filterEvents(response.data); // Filter events after they are fetched
      } catch (err) {
        setError('No events');
      } finally {
        setLoading(false);
      };
    };
    fetchEvents();
  }, []);

  const filterEvents = (eventsData) => {
    // Get the current time (in local time)
    const currentTime = new Date();

    // Filter events based on their end time (only show events that are still going or upcoming)
    const upcomingEvents = eventsData.filter((event) => {
      const eventEndTime = new Date(event.event_end_timestamp);
      console.log({ eventEndTime, currentTime });

      return eventEndTime.getTime() > currentTime.getTime(); // Show events that have not yet ended
    });

    setFilteredEvents(upcomingEvents);
  };

  if (loading) {
    return <div>Loading events...</div>;
  };

  return (
    <div className="event-listing">
      <h2>Upcoming Events</h2>

      {error && <p className="error">{error}</p>}

      <div className="event-grid">
        {/* {filteredEvents.length <= 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event.event_id}>
                <h2>{event.event_name}</h2>
                <p>{event.event_description}</p>
                <p><strong>Location:</strong> {event.event_location_address}</p>
                <p><strong>Start:</strong> {new Date(event.event_start_timestamp).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(event.event_end_timestamp).toLocaleString()}</p>
                {event.event_image_name && (
                  <img src={event.event_image_name} alt={event.event_name} width="200" />
                )}
              </li>
            ))}
          </ul>
        )} */}

        {filteredEvents.length <= 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          filteredEvents.map((event) => (
            <Link
              to={`/events/${event.event_id}`} // Corrected the dynamic link
              key={event.event_id}
              className="event-card-link"
            >
              <div className="event-card">
                {/* Add event image */}
                {event.event_image_name && (
                  <img
                    src={event.event_image_name}
                    alt={event.event_name}
                    className="event-image"
                  />
                )}

                {/* Event Map with location */}
                {event.latitude && event.longitude && (
                  <MapContainer
                    center={[event.latitude, event.longitude]}
                    zoom={12}
                    style={{ height: '200px', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[event.latitude, event.longitude]} />
                  </MapContainer>
                )}

                <h3>{event.event_name}</h3>
                <p>Event start: {new Date(event.event_start_timestamp).toLocaleString()}</p>
                <p>Event end: {new Date(event.event_end_timestamp).toLocaleString()}</p>
                <p>Address: {event.event_location_address}</p>
                <p>{event.event_description.substring(0, 100)}...</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventListing;
