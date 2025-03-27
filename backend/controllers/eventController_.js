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
      row.event_image_name = 'http://192.168.6.58:3000/uploads/event/' + row.event_image_name;
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
      event_image_name: 'http://192.168.6.58:3000/uploads/event/' + imageRows[0].event_image_name,
    };

    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error fetching event' });
  }
};

const createEvent = async (req, res) => {
  const {
    eventName,
    eventDescription,
    eventLocationAddress,
    eventStartTimestamp,
    eventEndTimestamp,
    latitude,
    longitude,
    hostEmail,
  } = req.body;

  let mediaObj;
  try {
    mediaObj = JSON.parse(req.body.mediaDetails);
  } catch (error) {
    console.error('Invalid mediaDetails format:', error.message);
    return res.status(400).json({ message: 'Invalid mediaDetails format' });
  }

  try {
    // Validate host
    // console.log('Checking host:', hostEmail);
    const [host] = await connection.query(
      'SELECT host_email FROM hosts WHERE host_email = ? AND host_status = ?',
      [hostEmail, 'approved']
    );
    // console.log('Host query result:', host);
    if (host.length === 0) {
      // console.log('Host validation failed: Unauthorized or host not approved');
      return res.status(403).json({ message: 'Unauthorized or host not approved' });
    }

/*     // Insert event
    console.log('Inserting event with values:', {
      eventName,
      eventDescription,
      eventLocationAddress,
      latitude,
      longitude,
      eventStartTimestamp,
      eventEndTimestamp,
      hostEmail,
    }); */
    const [result] = await connection.query(
      'INSERT INTO events (event_name, event_description, event_location_address, event_location_latitude, event_location_longitude, event_start_timestamp, event_end_timestamp, host_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        eventName,
        eventDescription,
        eventLocationAddress,
        latitude,
        longitude,
        eventStartTimestamp,
        eventEndTimestamp,
        hostEmail,
      ]
    );
    if (!result.insertId) {
      // console.log('Event insertion failed: No insertId returned');
      return res.status(500).json({ message: 'Failed to insert event into database' });
    }
    const eventId = result.insertId;
    // console.log('Event inserted with ID:', eventId);

    // Insert event image
    // console.log('Inserting event image:', mediaObj.name);
    const [imageResult] = await connection.query(
      'INSERT INTO event_image_name (event_id, event_image_name) VALUES (?, ?)',
      [eventId, mediaObj.name]
    );
    if (imageResult.affectedRows !== 1) {
      // console.log('Image insertion failed: No rows affected');
      return res.status(500).json({ message: 'Failed to insert image into database' });
    }
    // console.log('Image link inserted into event_image_name');

    res.status(201).json({ message: 'Event created successfully', event_id: eventId });
  } catch (error) {
    console.error('Error creating event:', error.message, error.stack);
    res.status(500).json({ message: 'Server error creating event', error: error.message });
  }
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