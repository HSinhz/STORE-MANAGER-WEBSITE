const Customer = require('../app/models/Customer');
const ShopOwner = require('../app/models/ShopOwner');
async function getCustomerById( CustomerId, ShopId) {
    try {
        let data = {};
        const existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner) {
            let existCustomer = await Customer.findOne({_id: CustomerId}).select('_id Name Phone Address');
            console.log("ExistCustomer: ", existCustomer )
            if( existCustomer) {
                data = {
                    Success: true,
                    Mess: 'Successfully',
                    Data: existCustomer
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'Khách hàng không tồn tại'
                }
            }
        } else {
            data = {
                Success: false,
                Mess: 'Cửa hàng không tồn tại'
            }
        }
        return data;
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: "Error from Server 1111"
        }
    }
}

module.exports = {
    getCustomerById: getCustomerById,
}