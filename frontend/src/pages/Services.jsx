// Services.jsx
import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = ({ setBookings }) => {
  const [services, setServices] = useState([]); // All services
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  // Simulate backend data with dummy entries
  const fetchServices = async () => {
    const dummyServices = [
      { id: 1, name: 'Guitar Lessons', price: 50, contact: '123-456-7890' },
      { id: 2, name: 'Photography Session', price: 150, contact: '987-654-3210' },
      { id: 3, name: 'Cooking Classes', price: 75, contact: '555-666-7777' },
      { id: 4, name: 'Yoga Instructor', price: 40, contact: '888-999-0000' },
    ];
    setServices(dummyServices);
    setFilteredServices(dummyServices);
  };

  useEffect(() => {
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
              <p>Contact: {service.contact}</p>
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
