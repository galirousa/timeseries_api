const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require('mongoose');

//Importerer routes
const addRoute = require('./api/addTime');
const dayRoute = require('./api/day');
const weekRoute = require('./api/week');
const weekSum = require('./api/weekSum');
const clientRoute = require('./api/allMeters');

//setter opp parser til å bare ta inn JSON
app.use(parser.json());

//kobler til databasen, bruker MongoDB Atlas
mongoose.connect('mongodb+srv://mongo:mongo@cluster0-c5dsq.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//CORS Handling
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
   
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        return res.status(200).json({});
    }
    next();
});

//Tar i bruk routene
app.use('/addTime', addRoute);
app.use('/day', dayRoute);
app.use('/week', weekRoute);
app.use('/weekSum', weekSum);
app.use('/allMeters', clientRoute);


/**
 * Error Handling
 */

 app.use((req,res,next) =>{
     const error = new Error('No route found');
     error.status=404;
     next(error); //Sender error videre
 })

//Tar i mot error 
 app.use((error, req,res,next) => {
     res.status(error.status);
     res.json({
         error:{
             message: error.message
         }
     });
 });
module.exports = app;
