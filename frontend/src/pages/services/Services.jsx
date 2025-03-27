import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

const Services = ({ setBookings }) => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    // Fetch services from backend
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://192.168.6.58:5000/services');
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleBookService = async (service) => {
    alert(`Service booked: ${service.name}`);
    setBookings((prevBookings) => [...prevBookings, service]);
  };

  const handleSearch = () => {
    const results = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  };

  return (
    <div className="services-container">
      <h1>Services</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="services-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <h2>{service.name}</h2>
              <p>Price: ${service.price}</p>
              <p>{service.description}</p>
              <button onClick={() => handleBookService(service)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No services available or match found.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
