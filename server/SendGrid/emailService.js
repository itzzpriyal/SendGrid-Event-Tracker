
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SendGrid_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
    const msg = {
        to,
        from: 'gpriyal856@gmail.com', // Replace with your verified sender
        subject,
        text,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Failed to send email:', error.response?.body || error.message);
    }
};

module.exports = sendEmail;