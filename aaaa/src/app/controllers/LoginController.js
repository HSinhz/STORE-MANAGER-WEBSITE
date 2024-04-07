const LoginService = require('../../Services/LoginService');


class LoginController {
    async handlerLogin(req, res ){
        try {
            if( !req.body.Email || !req.body.Password){
                return res.status(200).json({
                    Success: false,
                    Mess: 'User is required',
                })
            } 
            let data = await LoginService.handlerLogin(req.body);
            if( data && data.Success === true ){
                res.cookie('AccessToken', data.access_token, {httpOnly: true, maxAge: 30 * 60 * 1000});
                res.cookie('RefreshToken', data.refresh_token, {httpOnly: true, maxAge: 60 * 60 * 1000});
            }
            return res.status(200).json( {data});
        } catch (error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            })
        }
    }
}

module.exports = new LoginController;