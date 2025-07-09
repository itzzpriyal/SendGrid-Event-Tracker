const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const user_route = require('./routes/userRoute');
const webhookRoute = require('./routes/webhookRoute');


const app = express();   //creating an Express App(mini server) , express is a function that gives us this server object
app.use(bodyParser.json());  // bodyParser.json() is a middleware — it processes incoming request data(reads and understand the data) and makes it available as req.body in your routes.
app.use(cors());   //CORS stands for Cross-Origin Resource Sharing. Allow requests from other websites (like your frontend running on a different port) to reach this backend server.
dotenv.config();   //You can store sensitive things like DB passwords, API keys, etc., in .env, and access them via  process.env. => dotenv.config() opens a secret notebook (the .env file) and lets your app read what's inside securely.

const PORT = process.env.PORT || 7000; //if by default that port is not there then we will go for port no 7000
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {               //This line tells Mongoose (MongoDB library) to connect your MongoDB database to node.js application using the URL you stored.->{The URL variable should contain your MongoDB CONNECTION string.}

  console.log("DB connected successfully");

  app.listen(PORT, () => {           //This line starts your Express server and tells it to listen for incoming requests on the port specified by the PORT variable.
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch((err) => {
  console.error("DB connection failed:");
  console.error(err); // Logs full error details
});

/*This line starts connecting to your MongoDB database.
It returns a Promise(it is like a guarantee for the future.=>’ll promise to tell you the result later — either success ✅ or error ❌.), meaning:
   If the connection succeeds, it goes into the .then() block.
   If the connection fails, it goes into the .catch() block.*/
app.use('/api/user', user_route);   //(/api/user)is the base URL path. All routes inside your route file will start with this.
// route = 	This is the imported router (from something like userRoute.js) that has specific endpoints inside it.
app.use('/webhook', webhookRoute);

