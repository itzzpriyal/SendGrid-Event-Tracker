const express = require('express');
const { fetch, create, update, deleteUser } = require('../controller/userController');  //importing both handlers from controller

const route = express.Router();    //When your app grows, keeping all routes in index.js becomes messy. Routers help you modularize and clean up your code.
/*
You can attach route handlers (like .get(), .post(), etc.) to it.
Later, you "plug it in" to your main app with app.use().
*/

route.get('/fetch', fetch); // we only want to keep all the routes here 
route.post('/create', create);
route.put('/update/:email', update);
route.delete('/delete/:email', deleteUser);
module.exports = route;
