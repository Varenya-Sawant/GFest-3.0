const { createTransport } = require("nodemailer");

const sendEmail = async (event, userEmail) => {
    try {
        const transposter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                // Your email password or app-specific password
                user: 'helekarsohmm@gmail.com',
                pass: 'gyde tieu tknp cqzd'
            }
        });

        await transposter.sendMail({
            from: 'helekarsohmm@gmail.com',
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

const sendEmailToSellers = async (items) => {
    try {
        const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER || 'helekarsohmm@gmail.com',
                pass: process.env.EMAIL_PASS || 'gyde tieu tknp cqzd',
            },
        });

        for (const item of items) {
            const mailOptions = {
                from: `"GFest Team" <${process.env.EMAIL_USER || 'helekarsohmm@gmail.com'}>`,
                to: item.seller_email,
                subject: `New Order Notification for Product ID: ${item.product_id}`,
                text: `Dear Seller,

A customer has placed an order containing your product.

Order Details:
- Product Name: ${item.product_name}
- Product ID: ${item.product_id}
- Quantity: ${item.quantity}
- Total Price: ₹${item.total}

Please prepare the product for shipment.

Best regards,
GFest Team`,
            };

            await transporter.sendMail(mailOptions);
        }

        console.log('Emails sent to sellers successfully.');
        return true;
    } catch (error) {
        console.error('Error sending emails to sellers:', error.message);
        return false;
    }
};

module.exports = { sendEmail, sendEmailToSellers };