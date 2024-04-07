const  mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const Product = new Schema({
        ShopId: { type: ObjectId, maxLength: 600 },
        CategoryId: { type: ObjectId, maxLength: 600 },
        Name : { type: String},
        Price: {type: Number},
        ImageUrl: {type: String},
        Description: { type: String, maxLength: 600 },
    },
    {
        timestamps: true,
    },
);



module.exports = mongoose.model('Product', Product); 