const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
    idstatus: { type: Number, default: 1},
    Name: { type: String}
})

module.exports = mongoose.model('Status', Status);

