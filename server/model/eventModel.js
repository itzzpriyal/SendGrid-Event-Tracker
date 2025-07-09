const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    email: String,
    event: String,
    timestamp: Number,
    response: String,

});

module.exports = mongoose.model("SendGridEvent", eventSchema);