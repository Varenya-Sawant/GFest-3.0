import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn] = useState(true); // Replace with actual auth check (e.g., JWT)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event details');
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!window.confirm('Are you sure you want to register for this event?')) return;

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        eventId: id,
        userEmail: 'user@example.com', // Replace with authenticated user's email
      });
      setSuccessMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccessMessage('');
    }
  };

  if (!event) return <p>Loading...</p>;

  const mapStyles = { height: '400px', width: '100%' };
  const position = {
    lat: parseFloat(event.event_location_latitude),
    lng: parseFloat(event.event_location_longitude),
  };

  return (
    <div className="event-details">
      <h2>{event.event_name}</h2>
      <p><strong>Date & Time:</strong> {new Date(event.event_start_timestamp).toLocaleString()} - {new Date(event.event_end_timestamp).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.event_location_address}</p>
      <p><strong>Description:</strong> {event.event_description}</p>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={mapStyles} center={position} zoom={13}>
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
      {isLoggedIn && (
        <button onClick={handleRegister}>Register for Event</button>
      )}
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EventDetails;