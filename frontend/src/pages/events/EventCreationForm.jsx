import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './EventCreationForm.css';

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const EventCreationForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventLocationAddress: '',
    eventStartTimestamp: '',
    eventEndTimestamp: '',
    latitude: null,
    longitude: null,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [position, setPosition] = useState([15.5010, 73.8294]); // Default map position (Goa)
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Map click handler
  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      },
    });
    return position ? <Marker position={position}></Marker> : null;
  };

  // Validate address using Nominatim API
  const validateAddress = async () => {
    const address = formData.eventLocationAddress;
    if (!address) {
      setErrors((prev) => ({ ...prev, eventLocationAddress: 'Please enter an address' }));
      return false;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lon,
          eventLocationAddress: data[0].display_name, // Optional: Update address with full name
        }));
        setErrors((prev) => ({ ...prev, eventLocationAddress: null }));
        return true;
      } else {
        setErrors((prev) => ({ ...prev, eventLocationAddress: 'Address not found' }));
        return false;
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setErrors((prev) => ({ ...prev, eventLocationAddress: 'Error validating address' }));
      return false;
    }
  };

  // Form validation
  const validateForm = async () => {
    const newErrors = {};
    if (!formData.eventName) newErrors.eventName = 'Event name is required';
    if (!formData.eventDescription) newErrors.eventDescription = 'Event Description is required';
    if (!formData.eventStartTimestamp) newErrors.eventStartTimestamp = 'Start date is required';
    if (!formData.eventEndTimestamp) newErrors.eventEndTimestamp = 'End date is required';
    if (formData.eventStartTimestamp >= formData.eventEndTimestamp) newErrors.eventEndTimestamp = 'End date must be after start date';

    const isAddressValid = await validateAddress();
    if (!isAddressValid || !formData.latitude || !formData.longitude) {
      newErrors.location = 'Please provide a valid location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validateForm())) return;

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]);
        }
      }
      images.forEach((image, index) => {
        data.append('media', image);
        data.append('mediaDetails', JSON.stringify({
          uri: imagePreviews[index],
          type: image.type,
          name: image.name,
        }));
      });
      data.append('hostEmail', localStorage.getItem('user_email'));

      const response = await axios.post('http://localhost:3000/api/events/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('Event created successfully!');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrors({ server: 'Unauthorized or host not approved' });
      } else {
        setErrors({ server: error.response?.data?.message || 'Failed to create event' });
      }
      setSuccessMessage('');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="event-creation-form">
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
          {errors.eventName && <span className="error">{errors.eventName}</span>}
        </div>

        <div>
          <label>Event Description:</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
          />
          {errors.eventDescription && <span className="error">{errors.eventDescription}</span>}
        </div>

        <div>
          <label>Location Address:</label>
          <input
            type="text"
            name="eventLocationAddress"
            value={formData.eventLocationAddress}
            onChange={handleChange}
          />
          <button type="button" onClick={validateAddress}>Validate Address</button>
          {errors.eventLocationAddress && (
            <span className="error">{errors.eventLocationAddress}</span>
          )}
        </div>

        <div>
          <label>Start Date & Time:</label>
          <input
            type="datetime-local"
            name="eventStartTimestamp"
            value={formData.eventStartTimestamp}
            onChange={handleChange}
          />
          {errors.eventStartTimestamp && (
            <span className="error">{errors.eventStartTimestamp}</span>
          )}
        </div>

        <div>
          <label>End Date & Time:</label>
          <input
            type="datetime-local"
            name="eventEndTimestamp"
            value={formData.eventEndTimestamp}
            onChange={handleChange}
          />
          {errors.eventEndTimestamp && (
            <span className="error">{errors.eventEndTimestamp}</span>
          )}
        </div>

        <div>
          <label>Select Location:</label>
          <MapContainer center={position} zoom={12} style={{ height: '300px', width: '75%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <LocationMarker />
          </MapContainer>
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div>
          <label>Upload Images:</label>
          <input type="file" onChange={handleImageChange} />
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" style={{ width: '100px', margin: '5px' }} />
            ))}
          </div>
        </div>

        {errors.server && <span className="error">{errors.server}</span>}
        {successMessage && <span className="success">{successMessage}</span>}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreationForm;