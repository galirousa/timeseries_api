const express = require('express');
const router = express.Router();
const Meter = require('./models/meter');


//SKal ta inn meter_id og dato
router.get('/:meter_id/:from/:to', (req,res,next) => {
    const id = req.params.meter_id;
    const fromDate = req.params.from;
    const toDate = req.params.to;
    //Henter alle values fra 1 strømmåler mellom datoene satt
    Meter.find({meter_id: `${id}`, from: { $gte: `${fromDate}`, $lte: `${toDate}`}})
    .exec()
    .then(doc => {
        
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

module.exports = router;