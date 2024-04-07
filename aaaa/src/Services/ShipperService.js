const ShopOwner = require('../app/models/ShopOwner');
const Shipper = require('../app/models/Shipper');

const createShipper = async (Email, Name, Phone, Address, ShopId ) => {
    try {

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            data: {
                Success: false,
                Mess: 'Error from Server aaa'
            }
        })
    }
}

const editShipper = async (Email, Name, Phone, Address, ShipperId,ShopId) => {
    try {

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            data: {
                Success: false,
                Mess: 'Error from Server aaa'
            }
        })
    }
}

const deleteShipper = async ( ShipperId, ShopId) => {
    try {

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            data: {
                Success: false,
                Mess: 'Error from Server aaa'
            }
        })
    } 
}

const showShipper = async (ShopId) => {
    try {

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            data: {
                Success: false,
                Mess: 'Error from Server aaa'
            }
        })
    }
} 

module.exports = {
    createShipper,
    editShipper,
    deleteShipper,
    showShipper
}