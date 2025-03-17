// const connection = require('../mysql');
// const { body, validationResult } = require('express-validator');

// const createEvent = [
//   // Validation middleware
//   body('eventName').notEmpty().withMessage('Event name is required'),
//   body('eventStartTimestamp').isISO8601().withMessage('Invalid start date'),
//   body('eventEndTimestamp').isISO8601().withMessage('Invalid end date'),
//   body('latitude').isFloat().withMessage('Invalid latitude'),
//   body('longitude').isFloat().withMessage('Invalid longitude'),
//   body('hostEmail').isEmail().withMessage('Invalid host email'),

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
//     }

//     const {
//       eventName,
//       eventDescription,
//       eventLocationAddress,
//       eventStartTimestamp,
//       eventEndTimestamp,
//       latitude,
//       longitude,
//       hostEmail,
//       imageLinks = [],
//     } = req.body;

//     try {
//       // Start transaction
//       const conn = await connection.getConnection();
//       await conn.beginTransaction();

//       try {
//         // Insert into events table
//         const [eventResult] = await conn.execute(
//           `INSERT INTO events (
//             event_name, event_description, event_location_address,
//             event_location_latitude, event_location_longitude,
//             event_start_timestamp, event_end_timestamp, host_email
//           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             eventName,
//             eventDescription,
//             eventLocationAddress,
//             latitude,
//             longitude,
//             eventStartTimestamp,
//             eventEndTimestamp,
//             hostEmail,
//           ]
//         );

//         const eventId = eventResult.insertId;

//         // Insert image links
//         if (imageLinks.length > 0) {
//           const imageValues = imageLinks.map((link) => [eventId, link]);
//           await conn.query(
//             'INSERT INTO event_image_links (event_id, event_media_link) VALUES ?',
//             [imageValues]
//           );
//         }

//         await conn.commit();
//         res.status(201).json({ message: 'Event created successfully', eventId });
//       } catch (error) {
//         await conn.rollback();
//         throw error;
//       } finally {
//         conn.release();
//       }
//     } catch (error) {
//       console.error('Error creating event:', error);
//       res.status(500).json({ message: 'Server error during event creation' });
//     }
//   },
// ];

// const getEvent = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [eventRows] = await connection.query(
//       'SELECT * FROM events WHERE event_id = ?',
//       [id]
//     );
//     if (eventRows.length === 0) {
//       return res.status(404).json({ message: 'Event not found' });
//     };

//     const [imageRows] = await connection.query(
//       'SELECT event_media_link FROM event_image_links WHERE event_id = ?',
//       [id]
//     );

//     const event = {
//       ...eventRows[0],
//       imageLinks: imageRows.map((row) => row.event_media_link),
//     };

//     res.status(200).json(event);
//   } catch (error) {
//     console.error('Error fetching event:', error);
//     res.status(500).json({ message: 'Server error fetching event' });
//   }
// };

// module.exports = { createEvent, getEvent };