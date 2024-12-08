// src/pages/ArtisanDashboard.js
import React from 'react';

const ArtisanDashboard = ({ bookings }) => {
  // Ensure bookings is defined and is an array
  const serviceList = bookings || [];

  return (
    <div className="dashboard-container">
      <h1>Artisan Dashboard</h1>
      <h2>Manage Services</h2>
      <button>Add New Service</button>
      <ul className="service-list">
        {serviceList.length === 0 ? (
          <li>No services booked.</li>
        ) : (
          serviceList.map((service) => (
            <li key={service.id}>
              {service.name} 
              <button>Edit</button> 
              <button>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ArtisanDashboard;
