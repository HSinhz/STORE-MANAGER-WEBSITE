async function confirmNewPass( req, res, next ){
    
    if( req.body.Newpass === req.body.ConfirmNewPass ){
        next();
    } else {
        return res.status(400).json({
            data: {
                Success: false,
                Mess: 'New password and confirmation are invalid'
            }
        });
    }
}



module.exports = {
    confirmNewPass: confirmNewPass
}