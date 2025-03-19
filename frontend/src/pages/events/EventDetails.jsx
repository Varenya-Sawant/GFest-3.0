import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL params
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const userEmail = localStorage.getItem('user_email'); // Check if user is logged in
  // const token = localStorage.getItem('token'); // Authorization token

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load event details.');
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  // Handle event registration
  const handleRegister = async () => {
    if (!userEmail /* || !token */) {
      navigate('/login');
      return;
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/events/register',
        { eventId: id, userEmail },
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      setRegistrationMessage(response.data.message);
    } catch (err) {
      setRegistrationMessage(err.response?.data?.message || 'Failed to register for the event');
    };
  };

  // Show loading or error state
  if (loading) return <div className="loading">Loading event...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div className="error">Event not found.</div>;

  return (
    <div className="event-details-container">
      <h2 className="event-name">{event.event_name}</h2>

      {/* Main event image */}
      {event.event_image_name && (
        <div className="event-main-image">
          <img
            src={event.event_image_name}
            alt={event.event_name}
            className="event-main-image-style"
          />
        </div>
      )}

      <div className="event-details">
        <p><strong>Start:</strong> {new Date(event.event_start_timestamp).toLocaleString()}</p>
        <p><strong>End:</strong> {new Date(event.event_end_timestamp).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.event_location_address}</p>
        <p><strong>Latitude:</strong> {event.event_location_latitude}</p>
        <p><strong>Longitude:</strong> {event.event_location_longitude}</p>
        <p><strong>Description:</strong> {event.event_description}</p>
        <p><strong>Hosted by:</strong> {event.host_email}</p>
      </div>

      {/* Registration section */}
      {userEmail && (
        <div className="register-section">
          {registrationMessage ? (
            <p className="registration-message">{registrationMessage}</p>
          ) : (
            <button onClick={handleRegister} className="register-button">
              Register for Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;