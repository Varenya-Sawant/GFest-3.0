import React from 'react';
import './Events.css';
import CalendarApp from '../../components/CalendarApp';

const Events = () => {
  return (
    <div className="container-events">
    <div className="events-page">
      <h1 className='eventH1'>Events</h1>
      
      <div className="calendar-wrapper">
        <CalendarApp />
      </div>
    </div>
    </div>
  );
};

export default Events;
