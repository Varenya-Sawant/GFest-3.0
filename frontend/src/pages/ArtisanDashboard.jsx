// ArtisanDashboard.jsx
import React, { useState } from 'react';
import './ArtisanDash.css';

const ArtisanDashboard = ({ bookings }) => {
  const [services, setServices] = useState(bookings || []);
  const [showInlay, setShowInlay] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = () => {
    if (!newService.name || !newService.price) {
      alert('Please fill in all required fields!');
      return;
    }

    if (editingMode) {
      setServices(
        services.map((service) =>
          service.id === currentService.id
            ? { ...service, ...newService }
            : service
        )
      );
      setEditingMode(false);
      setCurrentService(null);
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newService.name,
          description: newService.description,
          price: newService.price,
        },
      ]);
    }

    setShowInlay(false);
    setNewService({ name: '', description: '', price: '' });
  };

  const handleEdit = (service) => {
    setShowInlay(true);
    setEditingMode(true);
    setCurrentService(service);
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const handleCancel = () => {
    setShowInlay(false);
    setEditingMode(false);
    setCurrentService(null);
    setNewService({ name: '', description: '', price: '' });
  };

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h1>Artisan Dashboard</h1>
      <h2>Manage Services</h2>
      <button className="add-btn" onClick={() => setShowInlay(true)}>
        Add New Service
      </button>

      {showInlay && (
        <div className="inlay-form-container">
          <div className="inlay-form">
            <label>
              Service Name:
              <input
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newService.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newService.price}
                onChange={handleInputChange}
              />
            </label>
            <div className="inlay-actions">
              <button className="submit-btn" onClick={handleSubmit}>
                {editingMode ? 'Save Changes' : 'Submit'}
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="service-list">
        {services.length === 0 ? (
          <li>No services added yet.</li>
        ) : (
          services.map((service) => (
            <li key={service.id} className="service-item">
              <div>
                <strong>{service.name}</strong>
                <p>{service.description}</p>
                <p>Price: ${service.price}</p>
              </div>
              <div>
                <button className="edit-btn" onClick={() => handleEdit(service)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ArtisanDashboard;
