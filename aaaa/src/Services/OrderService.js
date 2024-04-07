
const Order = require("../app/models/Order");
const ShopOwner = require('../app/models/ShopOwner');
const Product = require('../app/models/Product');
const Customer = require("../app/models/Customer");
const {getSocketIo} = require("../webSocket");

async function handleCreateOrder(Name, Phone, Address, ProductId, AmountReduced, ShippingAmount,PaymentMethod, TotalAmount, Description,ShopId) {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ){
            let existProduct = await Product.findOne({_id: ProductId});
            if( existProduct ) {
                let newCustomer = new Customer({
                    ShopId: ShopId,
                    Name: Name,
                    Address:Address,
                    Phone: Phone,
                })
                let saveCustomer = await newCustomer.save();
                let CustomerId = saveCustomer._id;

                let order = await Order({
                    ShopId: ShopId,
                    CustomerId: CustomerId,
                    ProductId: ProductId,

                    AmountReduced: AmountReduced,
                    ShippingAmount: ShippingAmount,
                    TotalAmount: TotalAmount,
                    PaymentMethod: PaymentMethod,
                    Description: Description
                }).save().then(() => console.log("Đã tạo đơn hàng thành công"));
                const io =  getSocketIo();
                io.to(String(ShopId)).emit('new_order', { message: 'Có đơn hàng mới!' });
                data = {
                    Success: true,
                    Mess: 'Successfully create order'
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'Product is not exist'
                } 
            }
        } else {
            data = {
                Success: false,
                Mess: 'ShopOwner is not exist'
            }
        }
        return data;
    } catch( error ) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server assd',
        }
    }
}

async function getOrderWithPagination( page, limit, ShopId ) {
    try {
        let data = {};
        const existShopOwner = await ShopOwner.findOne({ _id: ShopId});
        if( existShopOwner ){
            let offset = ( page - 1) *limit;
            const count = await Order.find({ShopId: ShopId}).countDocuments();
            const order = await Order.find({ShopId: ShopId}).skip(offset).limit(limit);
            let totalPages = Math.ceil(parseInt(count)/limit);
            data = {
                Success: true,
                Mess: 'Show All Order',
                totalPages: totalPages,
                allOrder: order,
            }
        } else {
            data = {
                Success: false,
                Mess: 'Shop does not exist'
            }
        }
        return data;
    } catch ( error ){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

module.exports = {
    handleCreateOrder: handleCreateOrder,
    getOrderWithPagination: getOrderWithPagination,
}