const  mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Customer = new Schema({
        ShopId: { type: mongoose.Types.ObjectId, maxLength: 600 },
        Name: {type: String, maxLength: 600},
        Phone: { type: String, maxLength: 600 },
        Address: {type: String},
    },
    {
        timestamps: true,
    },
);



module.exports = mongoose.model('Customer', Customer); 