const express = require('express');
const { HandlingWebhook } = require('../controller/webhookController');
const route = express.Router();

route.post('/sendgrid-events', HandlingWebhook); // this listens to SendGrid webhook 


module.exports = route;

