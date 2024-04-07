const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentMethod = new Schema({
    IdMethod: { type: Number},
    Name: { type: String},
    Description: { type: String},

})

module.exports = mongoose.model('PaymentMethod', PaymentMethod);

