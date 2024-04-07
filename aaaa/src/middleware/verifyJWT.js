const { createJWT, verifyJWT } = require('./jwtacction');
const ShopOwner = require('../app/models/ShopOwner');
// '/mgr/Employee' '/mgr/createemployee' '/mgr/product/show' '/mgr/product/:id/update''/mgr/create/order'
// const nonSecurePaths = ['/home', '/shopowner/register' , '/api/v1/login' , '/generate' , '/verify' , '/login/app'];
const checkUserJWT = (req, res, next )=> {
        console.log("REQ.PATH:  check JWT", req.path)
        let cookies = req.cookies;
        // console.log("cookie check JWT", cookies)
        if( cookies && cookies.AccessToken && cookies.RefreshToken ){
            let decodeAccessToken = verifyJWT(cookies.AccessToken);
            let decodeRefreshToken = verifyJWT(cookies.RefreshToken);
            let expiresIn = decodeAccessToken.expiresIn;
            let check = checkExpiredJWT(expiresIn)
            if(decodeAccessToken){  // Kiểm tra AccessToken có tồn tại
                if( check ){ // Kiểm tra thời gian của AccessToken
                    req.user = decodeAccessToken;
                    // console.log("Token con thoi han")
                    // console.log("Token còn thời hạn")
                    next();
                } else {
                    if( decodeRefreshToken ){ // Kiểm tra RefreshToken có tồn tại
                        let expiresInRefresh = decodeRefreshToken.expiresIn;
                        if( checkExpiredJWT(expiresInRefresh)) {
                            let payloadAccess = {
                                shopId: decodeAccessToken.shopId,
                                email: decodeAccessToken.email,
                                roleId: decodeAccessToken.roleId,
                                expiresIn: Math.floor(Date.now() / 1000) + 30*60
                            }
                            let payloadRefresh = {
                                shopId: decodeAccessToken.shopId,
                                email: decodeAccessToken.email,
                                roleId: decodeAccessToken.roleId,
                                expiresIn: Math.floor(Date.now() / 1000) + 60*60
                                // expiresIn: process.env.JWT_EXPIRES_IN
                            }

                            // Tạo mới AccessToken và RefreshToken
                            let newAccessToken = createJWT(payloadAccess);
                            let newRefreshToken = createJWT( payloadRefresh);
                            req.user = newAccessToken;

                            // Cập nhật vào DBS
                            ShopOwner.updateOne( {Email: payloadAccess.email},{
                                $set: {
                                    access_token: newAccessToken,
                                    refresh_token: newRefreshToken
                                }
                            }). then().catch(() => console.log( "Thêm thất bại"))
                            // console.log("This is new AcessToken: ",newAccessToken);
                            // console.log("This is new RefreshToken: ",newRefreshToken);

                            req.user = decodeAccessToken;
                            res.cookie('AccessToken', newAccessToken, {httpOnly: true, maxAge: 30 * 60 * 1000});
                            res.cookie('RefreshToken', newRefreshToken, {httpOnly: true, maxAge: 60 * 60 * 1000});
                            next(); // ==> chuyển người dùng tới trang /homme nếu tất cả đã hoàn thành 
                        } else {
                            return res.status(500).json({
                                Success: false,
                                MessErr: "Refresh Token is not exist"
                            })        
                        }
                    } else {
                        return res.status(500).json({
                            Success: false,
                            MessErr: "Refresh Token is not exist 123"
                        })
                    }
                }
            } else {
                return res.status(401).json({
                    Success: false,
                    MessErr: "Access Token is not exist" 
                })
            }
            // console.log("cookies MDW1: ", cookies.AccessToken);
        } else {
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        }
}

const checkPermissionUser = ( req, res, next) => {
   
        console.log("REQ.PATH: create Employee check Permisstion ", req.path)

        // console.log("Req.User: ", req.user);
        if(req.user ){
            let role = req.user.roleId;
            console.log("Role User: ", role)
            if( role === 2 ){
                next();
            } else {
                console.log("Sai")
                return res.status(403).json({
                    data: {
                        Success: false,
                        Mess: 'No permissions to access'
                    }
                    
                })
            }
        } else {
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            
            })
        }
    
}



const checkExpiredJWT = (expiresIn) => {
    let currentTimes = Math.floor(Date.now() / 1000);
    // console.log("Time now: " ,currentTimes - expiresIn);
    
    if( currentTimes > expiresIn ){
       return false;
    } else {
        return true;
    }
}

module.exports = {
    checkUserJWT: checkUserJWT,
    checkPermissionUser:checkPermissionUser,
}