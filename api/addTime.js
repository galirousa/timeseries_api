const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meter = require('./models/meter');

router.post('/', (req,res,next) => {
    //Parser gjennom JSON data vi får inn
    const meter = new Meter({
        _id: new mongoose.Types.ObjectId(),
        meter_id: req.body.meter_id,
        customer_id: req.body.customer_id,
        resolution: req.body.resolution,
        from: req.body.from,
        to: req.body.to,
        values: req.body.values
    })

    //Metode fra Mongoose for å lagre dataen i DB
    meter
    .save()
    .then(result => {
        console.log(result);
    }).catch(err => console.log(err)); 
    
    res.status(201).json({
        message: 'Handling POST request to /addTime',
        addedSeries: meter
    });
})

module.exports = router;