import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const userEmail = localStorage.getItem('user_email');

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

  const handleRegister = async () => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/events/register', {
        eventId: id,
        userEmail,
      });
      setRegistrationMessage(response.data.message);
    } catch (err) {
      setRegistrationMessage(err.response?.data?.message || 'Failed to register for the event');
    }
  };

  if (loading) return <div className="event-loading">Loading event...</div>;
  if (error) return <div className="event-error">{error}</div>;
  if (!event) return <div className="event-error">Event not found.</div>;

  return (
    <div className="event-details-container">
      <h2 className="event-title">{event.event_name}</h2>

      {event.event_image_name && (
        <div className="event-image-wrapper">
          <img
            src={event.event_image_name}
            alt={event.event_name}
            className="event-main-image"
          />
        </div>
      )}

      <div className="event-details-card">
        <p className="event-detail">
          <span>Start:</span> {new Date(event.event_start_timestamp).toLocaleString()}
        </p>
        <p className="event-detail">
          <span>End:</span> {new Date(event.event_end_timestamp).toLocaleString()}
        </p>
        <p className="event-detail">
          <span>Location:</span> {event.event_location_address}
        </p>
        <p className="event-detail">
          <span>Latitude:</span> {event.event_location_latitude}
        </p>
        <p className="event-detail">
          <span>Longitude:</span> {event.event_location_longitude}
        </p>
        <p className="event-detail event-description">
          <span>Description:</span> {event.event_description}
        </p>
        <p className="event-detail">
          <span>Hosted by:</span> {event.host_email}
        </p>
      </div>

      {userEmail && (
        <div className="register-section">
          {registrationMessage ? (
            <p className={`registration-message ${registrationMessage.includes('Failed') ? 'error' : 'success'}`}>
              {registrationMessage}
            </p>
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