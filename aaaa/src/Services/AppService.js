
const Employee = require('../app/models/Employee');
const Order = require('../app/models/Order');
const ShopOwner = require('../app/models/ShopOwner');
const mongoose = require('mongoose');
const {generateOTP} = require('../util/createOTP');
const {sendVerifyOTP}  = require('../util/sendMail');
const { createJWT} = require('../middleware/jwtacction');
const {getSocketIo} = require("../webSocket")

const handlerLoginApp = async (Email) => {
    try {
        let existEmployee = await Employee.findOne({Email: Email});
        if(existEmployee ){
            let OTP = generateOTP();
            sendVerifyOTP(Email, OTP.OTP);
            let payload = {
                ShopId: existEmployee.ShopId,
                Email: existEmployee.Email,
            }
            let access_token = createJWT( payload);
            return {
                Success: true,
                OTP: OTP.OTP,
                AT: access_token,
                Mess: 'Successfully'
            }
        } 
        return {
            Success: false,
            Mess: 'Email không tồn tại',
        }
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

const updataStatusUpdate = async (Email, Status) => {
    try {
        let existEmployee = await Employee.findOne({Email: Email});
        if( existEmployee ){
            await Employee.updateOne({Email: Email}, {
                Online: Status
            }).then( () => console.log("Chỉnh sửa nhân viên thành công"));
            if( Status === true ){
                await Employee.updateOne({Email: Email}, {
                    OnlineRecent: Date.now()
                })
            } else if (Status === false) {
                let totalOnline = Date.now() - existEmployee.OnlineRecent + existEmployee.OnlineTotal;
                await Employee.updateOne({Email: Email}, {
                    OnlineTotal: totalOnline
                })
            }
            return {
                Success: true,
                Mess: 'Cập nhật trạng thái thành công'
            }
        } 
        return {
            Success: false,
            Mess: 'Nhân viên không tồn tại'
        }
    }catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

const showOrderWithStatus = async (ShopId, Status) => {
    try {
        let existShopOwner = await ShopOwner.findOne({ _id: ShopId });
        if (existShopOwner) {
            let orders = await Order.aggregate([
                {
                    $match: {
                        ShopId: new mongoose.Types.ObjectId(ShopId),
                        Status: 1
                    }
                },{
                    $lookup: {
                        from: 'customers', // Tên của collection chứa thông tin khách hàng
                        localField: 'CustomerId', // Trường trong order chứa mã khách hàng
                        foreignField: '_id', // Trường trong customers chứa mã khách hàng
                        as: 'CustomerInfo' // Tên của trường trong order chứa thông tin khách hàng
                    }
                },{
                    $lookup: {
                        from: 'products',
                        localField: 'ProductId',
                        foreignField: '_id',
                        as: 'ProductInfo'
                    }
                },{ 
                    $unwind: "$CustomerInfo" 
                },{ 
                    $unwind: "$ProductInfo" 
                },{
                    $project: {
                        _id: 1, // Bổ sung các trường bạn muốn giữ lại
                        Status: 1,
                        TotalAmount: 1,
                        CustomerName: '$CustomerInfo.Name',
                        CustomerPhone: '$CustomerInfo.Phone',
                        CustomerAddress: '$CustomerInfo.Address',
                        ProductName: '$ProductInfo.Name',
                        ProductImg: '$ProductInfo.ImageUrl',
                        createdAt: 1,
                    }
                }, {
                    $sort: {
                        createdAt: 1
                    }
                }
            ]).exec();
            return {
                Success: true,
                Mess: 'All order',
                Orders: orders
            }
        }
        return {
            Success: false,
            Mess: 'ShopOwner is not exist'
        }
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}
 
const updateStatusOrder = async (ShopId, Status, OrderId) => {
    try {
        let io = getSocketIo();
        io.on("checkcheck", (data) => {
            console.log("data checkcheck: ", data);
        })
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ) {
            let existOrder = await Order.findOne({_id: OrderId });
            if( existOrder ) {
                await Order.updateOne({_id: OrderId},{
                    Status: Status
                }).then(() => console.log("Đã giao hàng thành công"))
                return {
                    Success: true,
                    Mess: 'Đã giao hàng thành công đơn hàng'
                }
            }
            return {
                Success: false,
                Mess: 'Đơn hàng không tồn tại'
            }
        }
        return {
            Success: false,
            Mess: 'Cửa hàng không tồn tại'
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}
module.exports = {
    handlerLoginApp: handlerLoginApp,
    updataStatusUpdate:updataStatusUpdate,
    showOrderWithStatus: showOrderWithStatus,
    updateStatusOrder: updateStatusOrder
}