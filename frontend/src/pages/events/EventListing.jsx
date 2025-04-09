import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router'; // Corrected import
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the selected month/year

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
        filterEventsByMonth(response.data, currentDate);
      } catch (err) {
        setError('No events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filterEventsByMonth = (eventsData, date) => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

    const eventsInMonth = eventsData.filter((event) => {
      const eventStart = new Date(event.event_start_timestamp);
      const eventEnd = new Date(event.event_end_timestamp);
      // Include events that start or end in the selected month, or span across it
      return (
        (eventStart >= monthStart && eventStart <= monthEnd) ||
        (eventEnd >= monthStart && eventEnd <= monthEnd) ||
        (eventStart <= monthStart && eventEnd >= monthEnd)
      );
    });
    setFilteredEvents(eventsInMonth);
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    filterEventsByMonth(events, newDate);
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (loading) {
    return <div className="event-loading">Loading events...</div>;
  }

  return (
    <div className="event-listing-container">
      <div className="calendar-header">
        <button className="arrow-button" onClick={() => handleMonthChange(-1)}>
          &#9664; {/* Left arrow */}
        </button>
        <h2 className="event-listing-title">{monthName}</h2>
        <button className="arrow-button" onClick={() => handleMonthChange(1)}>
          &#9654; {/* Right arrow */}
        </button>
      </div>

      {error && <p className="event-error">{error}</p>}

      <div className="event-grid">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events in {monthName}.</p>
        ) : (
          filteredEvents.map((event) => (
            <Link
              to={`/events/${event.event_id}`}
              key={event.event_id}
              className="event-card-link"
            >
              <div className="event-card">
                {event.event_image_name && (
                  <img
                    src={event.event_image_name}
                    alt={event.event_name}
                    className="event-image"
                  />
                )}
                {event.latitude && event.longitude && (
                  <div className="event-map-wrapper">
                    <MapContainer
                      center={[event.latitude, event.longitude]}
                      zoom={12}
                      className="event-map"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      />
                      <Marker position={[event.latitude, event.longitude]} />
                    </MapContainer>
                  </div>
                )}
                <div className="event-content">
                  <h3 className="event-listing-title">{event.event_name}</h3>
                  <p className="event-time">
                    <span>Start:</span> {new Date(event.event_start_timestamp).toLocaleString()}
                  </p>
                  <p className="event-time">
                    <span>End:</span> {new Date(event.event_end_timestamp).toLocaleString()}
                  </p>
                  <p className="event-address">
                    <span>Address:</span> {event.event_location_address}
                  </p>
                  <p className="event-description">
                    {event.event_description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventListing;