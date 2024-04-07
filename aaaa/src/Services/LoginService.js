require("dotenv").config();
const ShopOwner = require('../app/models/ShopOwner');
const { createJWT} = require('../middleware/jwtacction');
const bcryptjs = require('bcryptjs');

const handlerLogin = async ( userData) => {
    try{
        let data = {};
        let existUser = await ShopOwner.findOne({ Email: userData.Email})
            if( existUser ){
                // Compare password
                let checkpass =  checkPassWord( userData.Password, existUser.Password);
                if( checkpass ){
                    if( existUser.Verify === true){
                        let payloadAccess = {
                            shopId: existUser._id,
                            email: existUser.Email,
                            roleId: existUser.Role,
                            expiresIn: Math.floor(Date.now() / 1000) + 30,
                        }
                        let payloadRefresh = {
                            shopId: existUser._id,
                            email: existUser.Email,
                            roleId: existUser.Role,
                            expiresIn: Math.floor(Date.now() / 1000) + 60*60,
                        }
                        // tạo Access_Token và Refresh_Token
                        let accessToken = createJWT(payloadAccess);
                        let refreshToken = createJWT(payloadRefresh);
                    
                        data = {
                            Success :true,
                            Mess : 'Đăng nhập thành công',
                            access_token:  accessToken,
                            refresh_token: refreshToken,
                        }     
                        // Kiểm tra errCode có đủ điều kiện
                        if( data.Success ){
                            ShopOwner.updateOne( {Email:existUser.Email},{
                                $set: {
                                    Access_token: data.access_token,
                                    Refresh_token: data.refresh_token
                                }
                            }) .catch( err => { console.error(err); })
                        }     
                    } else {
                        data = {
                            Success :false,
                            Mess : 'Account is invalid', 
                        }   
                    }
                    
                } else {
                    data = {
                        Success :false,
                        Mess : 'Email hoặc mật khẩu sai', 
                    }    
                }
            } else {    
                data = {
                    Success :false,
                    Mess : 'Email hoặc mật khẩu sai',
                }    
            }
            console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'ERROR: from Server'
        }
    }
}

const checkPassWord = (inputPass, hashPass) => {
    return bcryptjs.compareSync( inputPass, hashPass);
}

module.exports = {
    handlerLogin: handlerLogin,

}