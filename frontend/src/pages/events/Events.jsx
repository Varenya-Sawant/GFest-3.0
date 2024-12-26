import React from 'react';
import './Events.css';
import CalendarApp from '../../components/CalendarApp';

const Events = () => {
  return (
    <div className="events-page">
      <h1>Events Page</h1>
      {/* Add a wrapper around CalendarApp to apply the CSS styling */}
      <div className="calendar-wrapper">
        <CalendarApp />
      </div>
    </div>
  );
};

export default Events;
