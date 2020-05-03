const express = require('express');
const router = express.Router();
const Meter = require('./models/meter');

router.get('/:meter_id/:date', (req,res,next) => {
    const id = req.params.meter_id;
    const date = req.params.date;

    Meter.find({meter_id: `${id}`, from: `${date}`})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
    
})

module.exports = router;