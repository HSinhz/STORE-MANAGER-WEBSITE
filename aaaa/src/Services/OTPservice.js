require("dotenv").config();

const ShopOwner = require('../app/models/ShopOwner');
const {generateOTP} = require('../util/createOTP');
const {sendVerifyOTP} = require('../util/sendMail')


async function handlerOTPRegister (Email, Otp){
   
        try{
            let data = {};
            let shopOwner = await ShopOwner.findOne( {Email})
            console.log(shopOwner)

            let currentTime = Date.now();
            // Kiểm tra mã có đúng
            if( shopOwner ){
                if( shopOwner.Verify ){
                    data = {
                        Success: false,
                        Mess: 'ShopOwner has been valid'
                    }
                } else if( currentTime > shopOwner.ExpVerify) {
                    data = {
                        Success: false,
                        Mess: 'OTP expired. Please click to resend OTP',
                    }
                } else if( currentTime < shopOwner.ExpVerify ){
                    if( Otp == shopOwner.Code_Verify){
                        ShopOwner.updateOne({ Email: Email}, {
                            $set: {
                                Verify: true
                            }
                        }).then(() => console.log('ShopOwner created Successfully'));
                        data = {
                            Success: true,
                            Mess: 'ShopOwner created Successfully'
                        }
                    } else {
                        data = {
                            Success: false,
                            Mess: 'OTP incorrect'
                        }
                    }
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'User does not exist'
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



async function reOTP( key ){
    return new Promise ( async ( resolve, reject ) => {
        try {
            let data = {};
            let shopOwner = await ShopOwner.findOne( { URIVerify: key})
            console.log("Uri : ",shopOwner.URIVerify);
            console.log("shopOwner: ", shopOwner)
            if( shopOwner ){
                const OTPObj = generateOTP();
                
                await ShopOwner.updateOne({URIVerify: key}, {
                    $set: {
                        Code_Verify: OTPObj.OTP,
                        ExpVerify: OTPObj.ExpVerify,
                    }
                }).then( () => 
                    data  = {
                        Success: true,
                        MESS: 'OTP sent successfully',
                }).catch( )
                
                if( data.Success === true) {
                    sendVerifyOTP(shopOwner.Email, OTPObj.OTP)
                } else {
                    data  = {
                        Success: false,
                        MESS: 'Error from Server',
                    };
                }
                    
               resolve(data); 
            } else {
                data  = {
                    Success: false,
                    MESS: 'User is not exist',
                };
            }
            resolve(data);
        } catch ( error ){
            reject( error)
        }
    })
}

module.exports = {
    reOTP: reOTP,
    handlerOTPRegister: handlerOTPRegister,
}