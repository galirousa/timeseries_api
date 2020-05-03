const mongoose = require('mongoose');
/***
 * Definerer scheman for MongoDB
 */
const meterSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        meter_id: String,
        customer_id: String,
        resolution: String,
        from: Date,
        to: Date,
        values: {}
})

module.exports = mongoose.model('Meter', meterSchema);