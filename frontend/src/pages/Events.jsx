import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import './Events.css'; // Ensure to import your styles

const Events = () => {
    const [filter, setFilter] = useState('upcoming');

    const events = [
        { id: 1, date: '2024-10-07', title: 'Event 1', image: 'link_to_image1.jpg' },
        { id: 2, date: '2024-10-09', title: 'Event 2', image: 'link_to_image2.jpg' },
        { id: 3, date: '2024-10-10', title: 'Event 3', image: 'link_to_image3.jpg' },
        { id: 4, date: '2024-10-12', title: 'Event 4', image: 'link_to_image4.jpg' },
        { id: 5, date: '2024-10-15', title: 'Event 5', image: 'link_to_image5.jpg' },
        { id: 6, date: '2024-10-20', title: 'Event 6', image: 'link_to_image6.jpg' },
    ];

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const filteredEvents = filter === 'upcoming' 
        ? events 
        : events.filter(event => new Date(event.date) < new Date()); // Adjust this logic based on your needs

    return (
        <div className="events-page">
            <h1>Events Page</h1>
            <div className="calendar-container">
                <Calendar events={events} />
            </div>
            <div className="main-container">
                <div className="filters">
                    <div className="filter-card">
                        <h3>Filters</h3>
                        <div className="filter-options">
                            <button onClick={() => handleFilterChange('upcoming')}>Upcoming Events</button>
                            <button onClick={() => handleFilterChange('past')}>Past Events</button>
                            <button onClick={() => handleFilterChange('categories')}>Categories</button>
                        </div>
                    </div>
                    <div className="filter-card">
                        <h3>Categories</h3>
                        <ul>
                            <li>Category 1</li>
                            <li>Category 2</li>
                            <li>Category 3</li>
                        </ul>
                    </div>
                </div>
                <div className="event-cards">
                    {filteredEvents.map(event => (
                        <div key={event.id} className="dispEvent">
                            <img src={event.image} alt={event.title} />
                            <h4>{event.title}</h4>
                            <p>Date: {event.date}</p>
                            <button className="enroll-button">Enroll</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
