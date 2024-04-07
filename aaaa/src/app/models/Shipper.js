const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const Shipper = new Schema({
    ShopId : {type: ObjectId, required: true},
    Email: {
        type: String,
        required: true,
        min: 5,
        max: 100,
        unique: true
    },
    Password: {
        type: String,
        min: 6,
        max: 100,
    },
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        max: 10,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Position: {
        type: String,
        required: true
    },
    Verify: {
        type: Boolean,
        required: true
    },
    CodeVerify: {
        type: Number,
    },
    ExpVerify: {
        type: Number,
    },
    Role: {
        type: Number,
        required: true
    },
    Delete: {
        type: Boolean,
        default: false,
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    Online: {
        type: Boolean,
        default: false
    },
    OnlineRecent: {
        type: Number,
    },
    OnlineTotal: {
        type: Number,
        default: 0
    }
})

Shipper.pre('save', async function(next){
    try{
        console.log('password: ', this.Password)
        const salt = await bcryptjs.genSalt(10);
        console.log('salt: ' , salt);
        const passwordHashed = await bcryptjs.hash(this.Password, salt);
        console.log('passwordHashed: ',passwordHashed);
        this.Password = passwordHashed;
        return false;
    } catch ( error){
        next(error);
    }
})

module.exports = mongoose.model('Shipper', Shipper); 