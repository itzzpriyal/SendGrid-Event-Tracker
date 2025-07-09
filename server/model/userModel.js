const mongoose = require('mongoose'); //imports mongoose library Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

const userSchema = new mongoose.Schema({ // creates a schema for the user data
    fname: {
        type: String, // the value must be a string.
        required: true // this field is mandatory when creating a user.
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("User", userSchema); // In a relational database system (RDBMS), we define a table with a specific name to store structured data. Similarly, in MongoDB using Mongoose, we create a schema and assign it a model name — such as "User" ,model is an inbuilt function in mongoose which creates a model/schema for us 
/*module
This refers to the current file you're writing in.
In Node.js, each file is considered a separate module.

exports
This is how you share code (like variables, functions, or objects) from your current file with other files.



*/

