import React, { useState } from 'react';
import './Dashboard.css';

const HostDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]); // Store events
  const [eventDetails, setEventDetails] = useState({
    id: null, // Add ID for editing
    title: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    advertisementImage: null,
  });
  const [isEditing, setIsEditing] = useState(false); // Track if editing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      advertisementImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventDetails.title && eventDetails.date && eventDetails.location) {
      if (isEditing) {
        // Update existing event
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventDetails.id ? eventDetails : event
          )
        );
        alert('Event updated successfully!');
      } else {
        // Add new event
        setEvents((prevEvents) => [
          ...prevEvents,
          { ...eventDetails, id: Date.now() },
        ]);
        alert('Event created successfully!');
      }
      resetForm();
      setShowModal(false);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setEventDetails(eventToEdit);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const resetForm = () => {
    setEventDetails({
      id: null,
      title: '',
      location: '',
      date: '',
      startTime: '',
      endTime: '',
      advertisementImage: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Host Dashboard</h1>

      <section className="event-management">
        <h2>Manage Events</h2>
        <button
          className="create-event-button"
          onClick={() => {
            setShowModal(true);
            resetForm(); // Ensure the form is cleared for new event creation
          }}
        >
          + Create New Event
        </button>
        <ul className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} className="event-item">
                <div>
                  <h3>{event.title}</h3>
                  <p>
                    {event.date} | {event.startTime} - {event.endTime}
                  </p>
                  <p>{event.location}</p>
                </div>
                <div>
                  <button onClick={() => handleEditEvent(event.id)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No events created yet.</p>
          )}
        </ul>
      </section>

      {/* Modal for creating/editing event */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit} className="create-event-form">
              <label>
                Event Title:
                <input
                  type="text"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={eventDetails.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Start Time:
                <input
                  type="time"
                  name="startTime"
                  value={eventDetails.startTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="time"
                  name="endTime"
                  value={eventDetails.endTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Advertisement Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  {isEditing ? 'Update Event' : 'Save Event'}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard;
