require("dotenv").config();
const ShopOwner = require('../app/models/ShopOwner');
const { generateOTP} = require('../util/createOTP')
const {verifyPass, hashPass } = require('../util/checkPass')
const {sendVerifyOTP} = require('../util/sendMail')
async function createShopOwner( Name, Email, Password, Phone, Address, ShopName, ShopAddress) {
   
        try {
            let data = {};
            let existShopOwner = await ShopOwner.findOne({Email});
            if(existShopOwner) { 
                data = {
                    Success : false,
                    Mess : "Account is exist"
                }
            } else {
                let OTPObj = generateOTP();
                const shopOwner = await new ShopOwner({
                    Email: Email,
                    Password: Password,
                    Name: Name,
                    Phone: Phone,
                    Address: Address,
                    Gender: true,
                    Shop_Name: ShopName,
                    Shop_Address: ShopAddress,
                    Verify: false,
                    Code_Verify: OTPObj.OTP,
                    ExpVerify: OTPObj.ExpVerify,
                    URIVerify: OTPObj.url,
                }).save().then(() => console.log("Đã lưu tài khoản khách hàng thành công")).catch();
                console.log(OTPObj.url)
                // Gửi mã OTP cho người dùng
                sendVerifyOTP(Email, OTPObj.OTP);
                data  = {
                    Success: true,
                    Mess: 'Successfully send OTP',
                    url: OTPObj.url
                }
            }
            return  data  
        } catch ( error ){
            console.log(error);
            return {
                Success: false,
                Mess: 'Error from server'
            }
        }
   
}

async function getProfileShopOwner(id){
    return new Promise( async ( resolve, reject) => {
        try {
            let data = {};
            const profileShopOwner = await ShopOwner.findOne({ _id: id});
            if( profileShopOwner){
                data = {
                    Success: true,
                    ShopOwner: profileShopOwner,
                }
            } 
            resolve(data);
        } catch (error ){
            data = {
                Success: false,
                Mess: 'ShopOwner does not exist'
            }
            resolve(data);
            reject(error)
        }
    } )
}

async function updateProfileShopOwner( id, datauser ){
    let data = {};
    try {
        let shopOwner = await ShopOwner.findOne( {_id: id} );
        console.log(shopOwner)
        if( shopOwner ) {
            await ShopOwner.updateOne({ _id: id}, datauser);
            data = {
                Success: true,
                Mess: `Update Successfully ShopOwner with _id:${shopOwner._id}`,
            }
        } 
        return data;
    } catch ( error ){
        data = {
            Success: false,
            Mess: 'User is not valid',
        }
        return data;
    }
   
}

async function deleteProfile( id ){
    let data = {};
    try {
        let shopOwner = await ShopOwner.findOne( {_id: id} );
        if( shopOwner ){
            await ShopOwner.deleteOne( { _id: id }).then(() => console.log(`Deleted ShopOwner with _id ${id}`))
            data = {
                Success: true,
                Mess: 'Deleted Successfully ShopOwner'
            }
            
        }
        return data;

    } catch ( error ){
        data = {
            Success: false,
            Mess: 'ShopOwner does not exist'
        }
        console.log('ERROR: _Id is not Object');
        return data;

    }
}

async function updatePass( id, OldPass, NewPass, ConfirmNewPass ){
    return new Promise( async ( resolve, reject) => {
        let data = {};
        try {
            let shopOwner = await ShopOwner.findOne( {_id: id} );
            console.log(shopOwner)
            if( shopOwner ){
                let oldPass = verifyPass(OldPass , shopOwner.Password);
                console.log('Current Pass: ', oldPass)

                if( oldPass ){
                     NewPass = await hashPass( NewPass);
                    console.log("NewPass Hasshed: ", NewPass);
                    await ShopOwner.updateOne( {_id: id}, {
                        $set: {
                            Password: NewPass
                        }
                    }).then( () => {
                        console.log("Update Password Successfully");
                        data = {
                            Success: true,
                            Mess: "Update Password Successfully"
                        }
                    }); 
                } else {
                    data = {
                        Success: false,
                        Mess: "Current Password is not exist"
                    }
                }
            } else {
                data = {
                    Success: false,
                    Mess: "ShopOwner is not exist"
                }
            }
            resolve( data ) 
        } catch ( error ){
            data = {
                Success : false,
                Mess: 'ShopOwner is not exist'
            }
            resolve( data ) 
            reject(error)
        }
    })
    
}
module.exports = {
    createShopOwner: createShopOwner,
    getProfileShopOwner: getProfileShopOwner,
    updateProfileShopOwner: updateProfileShopOwner ,
    deleteProfile: deleteProfile,
    updatePass: updatePass
}