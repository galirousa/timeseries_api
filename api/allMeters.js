const express = require('express');
const router = express.Router();
const Meter = require('./models/meter');


//SKal ta inn meter_id og dato
router.get('/:customer_id/:from/:to', (req,res,next) => {
    const id = req.params.customer_id;
    const fromDate = req.params.from;
    const toDate = req.params.to;
    //Henter alle values fra alle strømmålere mellom datoene satt for 1 kunde
    Meter.find({customer_id: `${id}`, from: { $gte: `${fromDate}`, $lte: `${toDate}`}})
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