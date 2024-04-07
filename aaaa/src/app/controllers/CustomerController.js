const customService = require('../../Services/CustomerService');

class CustomerController {
    async getCustomerById(req, res ){
        try {
            console.log('req.query.id', req.query.id)
            if( req.query.id) {
                if(req.user) {
                    let data = await customService.getCustomerById(req.query.id, req.user.shopId);
                    console.log("All Customer: ", data)

                    if(  data.Success === true ){
                        return res.status(200).json({
                            data: data
                        })
                    } else {
                        return res.status(200).json({
                            data: data
                        })
                    }
                } else {
                    return res.status(401).json({
                        Success: false,
                        Mess: 'Unauthorzied the user. Please Login'
                    })
                }
            } else {
                return res.status(200).json({
                    Success: false,
                    Mess: 'không tìm thấy khách hàng'
                })
            }
        } catch (error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            })
        }
    }
}

module.exports = new CustomerController;