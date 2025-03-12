import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './EventCreationForm__.css';

// Fix Leaflet marker icon issue
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
  const [position, setPosition] = useState([51.505, -0.09]); // Default map position (London)
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
    console.log({ files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Map click handler
  const LocationMarker = () => {
    useMapEvents({
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.eventName) newErrors.eventName = 'Event name is required';
    if (!formData.eventStartTimestamp) newErrors.eventStartTimestamp = 'Start date is required';
    if (!formData.eventEndTimestamp) newErrors.eventEndTimestamp = 'End date is required';
    if (!formData.latitude || !formData.longitude) newErrors.location = 'Please select a location on the map';
    if (formData.eventStartTimestamp >= formData.eventEndTimestamp) {
      newErrors.eventEndTimestamp = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Create FormData for both event data and images
      const data = new FormData();

      // Loop through each key-value pair in formData and append to the FormData
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]); // Append each key-value pair to FormData
        };
      };

      // Append images to the same FormData
      images.forEach((image) => {
        console.log({ image });
        console.log({ imagePreviews: imagePreviews[0] });

        data.append('media', image);

        data.append('mediaDetails', JSON.stringify({
          uri: imagePreviews[0],
          type: image.type,
          name: image.name
        })); // 'media' is the field name that multer expects
      });

      // Append the host email to the form data
      data.append('hostEmail', localStorage.getItem('user_email'));

      // Send the data to the server
      await axios.post('http://localhost:3000/api/events/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccessMessage('Event created successfully!');
      setErrors({});
      /* setFormData({
        eventName: '',
        eventDescription: '',
        eventLocationAddress: '',
        eventStartTimestamp: '',
        eventEndTimestamp: '',
        latitude: null,
        longitude: null,
      }); */
      // setImages([]);
      // setImagePreviews([]);

    } catch (error) {
      // Handle error
      setErrors({ server: error.message || 'Failed to create event' });
      setSuccessMessage('');
      console.error('Error:', error);
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
        </div>

        <div>
          <label>Location Address:</label>
          <input
            type="text"
            name="eventLocationAddress"
            value={formData.eventLocationAddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Start Date & Time:</label>
          <input
            type="datetime-local"
            name="eventStartTimestamp"
            value={formData.eventStartTimestamp}
            onChange={handleChange}
          />
          {errors.eventStartTimestamp && <span className="error">{errors.eventStartTimestamp}</span>}
        </div>

        <div>
          <label>End Date & Time:</label>
          <input
            type="datetime-local"
            name="eventEndTimestamp"
            value={formData.eventEndTimestamp}
            onChange={handleChange}
          />
          {errors.eventEndTimestamp && <span className="error">{errors.eventEndTimestamp}</span>}
        </div>

        <div>
          <label>Select Location:</label>
          <MapContainer center={position} zoom={13} style={{ height: '300px', width: '75%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
