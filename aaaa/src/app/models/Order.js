const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const Order = new Schema({
        ShopId: { type: ObjectId, required: true},
        ProductId: { type: ObjectId, required: true},
        CustomerId: { type: ObjectId, required: true},
        AmountReduced : { type: Number},
        ShippingAmount : {type: Number},
        TotalAmount : { type: Number, required: true},
        PaymentMethod: {type: String},
        Status: {type: Number,default: 1},
        Description: { type: String, maxLength: 600 },
    },
    {
        timestamps: true,
    },
);



module.exports = mongoose.model('Order', Order); 