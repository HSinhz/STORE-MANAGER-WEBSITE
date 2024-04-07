const OTPservice = require('../../services/OTPservice')


class OtpController {
    // [POST] /api/verifyotp
    async verify( req, res, next) {
        if( !req.body.Otp ){
            return res.status(400).json({
                Successs: false,
                Mess: 'OTP is not required'
            })
        }
        console.log(req.body);
        let data = await OTPservice.handlerOTPRegister( req.body.Email, req.body.Otp );
        console.log(data.Success)
        if( data.Success){
            return res.status(200).json(data);
        } 
        return res.status(400).json(data);

    }
    
    inputOtp( req, res, next){
        console.log("params: ", req.params.c);
        return res.status(200).json({
            MESS: 'nhập otp'
        })
    }

    async reOTP( req, res, next){
        let key = req.params.key;
        console.log('key: ', key);
        let data = await OTPservice.reOTP(key)
        if( data.Success ){
            return res.status(200).json(data);
        }
        return res.status(200).json(data);
    }
}

module.exports = new OtpController;