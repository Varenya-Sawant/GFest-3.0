const { createTransport } = require("nodemailer");

const sendEmail = async (event, userEmail) => {
    try {
        const transposter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                // Your email password or app-specific password
                user: '',
                pass: ''
            }
        });

        await transposter.sendMail({
            from: '',
            to: userEmail,
            subject: `Registration Confirmation for ${event.event_name}`,
            text: `Dear User,
      
You have successfully registered for the event "${event.event_name}"!
      
Event Details:
- Name: ${event.event_name}
- Description: ${event.event_description}
- Location: ${event.event_location_address}
- Start: ${new Date(event.event_start_timestamp).toLocaleString()}
- End: ${new Date(event.event_end_timestamp).toLocaleString()}
- Hosted by: ${event.host_email}
      
We look forward to seeing you there!
      
Best regards,
GFest Team`,
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    };
};

module.exports = { sendEmail }