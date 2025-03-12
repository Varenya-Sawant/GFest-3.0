const cron = require('node-cron');
const connection = require('../mysql');
const { sendEmail } = require('./emailService');

const scheduleReminders = () => {
  // Run every hour to check for upcoming events
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();
      const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      // Fetch events and registered users
      const [events] = await connection.query(
        'SELECT e.event_id, e.event_name, e.event_start_timestamp, u.user_email ' +
        'FROM events e ' +
        'JOIN user_register_for_events r ON e.event_id = r.event_id ' +
        'JOIN users u ON r.user_email = u.user_email ' +
        'WHERE e.event_start_timestamp BETWEEN ? AND ? OR e.event_start_timestamp BETWEEN ? AND ?',
        [now, twoDaysFromNow, now, oneHourFromNow]
      );

      for (const event of events) {
        const eventTime = new Date(event.event_start_timestamp);
        const timeDiff = eventTime - now;

        let subject, text;
        if (timeDiff <= 2 * 24 * 60 * 60 * 1000 && timeDiff > 24 * 60 * 60 * 1000) {
          subject = `Reminder: ${event.event_name} in 2 Days`;
          text = `Your event "${event.event_name}" is happening in 2 days on ${eventTime.toLocaleString()}.`;
        } else if (timeDiff <= 60 * 60 * 1000 && timeDiff > 0) {
          subject = `Reminder: ${event.event_name} in 1 Hour`;
          text = `Your event "${event.event_name}" is starting in 1 hour at ${eventTime.toLocaleString()}.`;
        }

        if (subject && text) {
          await sendEmail(event.user_email, subject, text);
        }
      }
    } catch (error) {
      console.error('Error in event reminder cron:', error);
    }
  });
};

module.exports = { scheduleReminders };