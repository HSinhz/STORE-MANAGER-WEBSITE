const Status = require('../models/Status');
const PaymentMethod = require('../models/PaymentMethod');
const orderService = require('../../Services/OrderService');
class OrderController {
    async showOrder(req, res ){
        try{
            if( req.query.page && req.query.limit ){
                let page = req.query.page;
                let limit = req.query.limit;
                if( req.user ){
                    const dataOrder = await orderService.getOrderWithPagination( page, limit, req.user.shopId );
                    // const dataEmployee = await employeeService.showEmployee(req.user.shopId);
                    if( dataOrder.Success === true ){
                        return res.status(201).json({ data: dataOrder})
                    } else {
                        return res.status(201).json({ data: dataOrder})
                    }
                } else {
                    return res.status(401).json({
                        data: {
                            Success: false,
                            Mess: 'Not Authenticated the user'
                        }   
                    
                    })
                }
            } else {
                return res.status(200).json({
                    data: {
                        Success: false,
                        Mess: 'NoData abc'
                    }
                })
            }
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    async createOrder(req, res){
        try{
            let { Name, Address, Phone, Product  , AmountReduced, ShippingAmount, TotalAmount, PaymentMethod, Description } = req.body.dataOrder;
            if( !Name  || !Address ||  !Phone || !TotalAmount || !PaymentMethod){
                return res.status(201).json({
                    Success: false,
                    Mess: 'Please enter full order information'
                })
            }
            if( req.user ){
                let data = await orderService.handleCreateOrder(Name, Phone, Address, Product, AmountReduced, ShippingAmount,PaymentMethod, TotalAmount, Description, req.user.shopId  );
                if( data.Success === true ){
                    return res.status(201).json({ data: data })
                } else {
                    return res.status(201).json({ data: data })
                }
            }
            
            
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

    async editOrder(req, res ){
        try{

        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }
}

module.exports = new OrderController;
