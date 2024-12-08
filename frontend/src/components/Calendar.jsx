import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Calendar.css';

const Calendar = ({ events = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [highlightedDate, setHighlightedDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today);
        setHighlightedDate(today);
    }, []);

    const handleDateClick = (date) => {
        setHighlightedDate(date);
    };

    const changeMonth = (increment) => {
        const newDate = new Date(
            highlightedDate.getFullYear(),
            highlightedDate.getMonth() + increment,
            1
        );
        setHighlightedDate(newDate);
    };

    const changeYear = (increment) => {
        const newDate = new Date(
            highlightedDate.getFullYear() + increment,
            highlightedDate.getMonth(),
            1
        );
        setHighlightedDate(newDate);
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-header">
                {day}
            </div>
        ));
    };

    const renderDays = () => {
        const days = [];
        const month = highlightedDate.getMonth();
        const year = highlightedDate.getFullYear();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        // Determine the weekday of the first day of the month
        const startDay = firstDay.getDay();

        // Add blank days for the start of the month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`blank-${i}`} className="calendar-day blank"></div>);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const eventDate = new Date(year, month, day);
            const isToday = eventDate.toDateString() === currentDate.toDateString();
            const hasEvent = events.some(event => new Date(event.date).toDateString() === eventDate.toDateString());

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'event-day' : ''}`}
                    onClick={() => handleDateClick(eventDate)}
                >
                    {day}
                    {hasEvent && <span className="event-indicator">●</span>}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar">
            <h2>Calendar</h2>
            <div className="calendar-header">
                <button onClick={() => changeYear(-1)}>«</button>
                <button onClick={() => changeMonth(-1)}>‹</button>
                <span>
                    {highlightedDate.toLocaleString('default', { month: 'long' })}{' '}
                    {highlightedDate.getFullYear()}
                </span>
                <button onClick={() => changeMonth(1)}>›</button>
                <button onClick={() => changeYear(1)}>»</button>
            </div>
            <div className="calendar-grid">
                {renderDaysOfWeek()}
                {renderDays()}
            </div>
            <div className="event-details">
                <h3>Events on {highlightedDate.toDateString()}</h3>
                <ul>
                    {events
                        .filter(event => new Date(event.date).toDateString() === highlightedDate.toDateString())
                        .map(event => (
                            <li key={event.id}>{event.title}</li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

// Prop validation
Calendar.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired, // Date in string format (e.g., "2024-11-30")
        })
    ),
};

export default Calendar;
