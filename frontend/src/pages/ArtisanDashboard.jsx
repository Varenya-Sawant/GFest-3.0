import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArtisanDash.css';

const ArtisanDashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/services', newService);
      setServices((prev) => [...prev, response.data]);
      setNewService({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Artisan Dashboard</h1>
      <div>
        <h2>Add New Service</h2>
        <input
          type="text"
          placeholder="Service name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtisanDashboard;
