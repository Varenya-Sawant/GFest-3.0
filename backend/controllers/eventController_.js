const connection = require('../mysql');
const { sendEmail } = require('../utils/sendEmail');
// const { body, validationResult } = require('express-validator');

// Existing createEvent function (from previous code) remains unchanged

const getAllEvents = async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT events.*, event_image_name.event_image_name 
      FROM events 
      LEFT JOIN event_image_name ON events.event_id = event_image_name.event_id
      ORDER BY event_start_timestamp ASC
    `);

    rows.forEach((row) => {
      row.event_image_name = 'http://localhost:3000/uploads/event/' + row.event_image_name;
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching events with images:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const [eventRows] = await connection.query(
      'SELECT * FROM events WHERE event_id = ?',
      [id]
    );
    if (eventRows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const [imageRows] = await connection.query(
      'SELECT event_image_name FROM event_image_name WHERE event_id = ?',
      [id]
    );

    const event = {
      ...eventRows[0],
      event_image_name: 'http://localhost:3000/uploads/event/' + imageRows[0].event_image_name,
    };

    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error fetching event' });
  }
};

const createEvent = async (req, res) => {
  const { eventName, eventDescription, eventLocationAddress, eventStartTimestamp, eventEndTimestamp, latitude, longitude, hostEmail } = req.body;

  const mediaObj = JSON.parse(req.body.mediaDetails);

  const [result] = await connection.query(
    "INSERT INTO events (event_name, event_description, event_location_address, event_location_latitude, event_location_longitude, event_start_timestamp, event_end_timestamp, host_email) VALUES (?, ?, ?, ?,?, ?, ?, ?)",
    [eventName, eventDescription, eventLocationAddress, latitude, longitude, eventStartTimestamp, eventEndTimestamp, hostEmail]
  );

  await connection.query(
    "INSERT INTO event_image_name (event_id, event_image_name) VALUES (?, ?)",
    [result.insertId, mediaObj.name]
  );

  res.json({ message: 'CreateEvent' });
};

const registerForEvent = async (req, res) => {
  const { eventId, userEmail } = req.body;

  try {
    // Check if event exists
    const [eventRows] = await connection.query(
      'SELECT * FROM events WHERE event_id = ?',
      [eventId]
    );
    if (eventRows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is already registered
    const [existing] = await connection.query(
      'SELECT * FROM user_registers_for_events WHERE user_email = ? AND event_id = ?',
      [userEmail, eventId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Register user for event
    await connection.query(
      'INSERT INTO user_registers_for_events (user_email, event_id) VALUES (?, ?)',
      [userEmail, eventId]
    );

    // Send confirmation email
    const event = eventRows[0];

    sendEmail(event, userEmail);

    res.status(201).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = { getAllEvents, getEvent, createEvent,  registerForEvent  };