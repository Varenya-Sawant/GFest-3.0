import React, { useState, useEffect } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';

function CalendarApp() {
  // Initialize events service plugin using useState
  const [eventsService] = useState(() => createEventsServicePlugin());

  // Use the calendar app hook
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-12-26',
        end: '2024-12-26',
      },
    ],
    plugins: [eventsService],
  });

  // Fetch all events on component mount
  useEffect(() => {
    eventsService.getAll(); // Fetch all events if needed
  }, [eventsService]);

  return (
    <div>
      {/* Render the ScheduleXCalendar component */}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
