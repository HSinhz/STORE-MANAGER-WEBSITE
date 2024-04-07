const  mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema({
        ShopId: { type: mongoose.Types.ObjectId, maxLength: 600 },
        Name: {type: String, maxLength: 600},
        Description: { type: String, maxLength: 600 },
    },
    {
        timestamps: true,
    },
);



module.exports = mongoose.model('Category', Category); 