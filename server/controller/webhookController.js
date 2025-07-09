const SendGridEvent = require('../model/eventModel');


const HandlingWebhook = async (req, res) => {
    try {
        const events = req.body; // Array of webhook events sent by SendGrid
        for (const event of events) {
            await SendGridEvent.create({      //await SendGridEvent.create() is a Mongoose function used to save data to MongoDB.
                email: event.email,
                event: event.event,
                timestamp: event.timestamp,
                response: event.response || '',
            });
        }
        
        res.status(200).send('EVENTS SAVED');

    } catch (error) {
        console.error('Error saving webhook events:', error);
        res.status(500).send('Server Error');
    }
};
module.exports = { HandlingWebhook };