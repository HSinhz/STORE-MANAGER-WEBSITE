const ShipperService = require('../../Services/ShipperService');

class ShiperController {
    async createShipper ( req, res ){
        try{
            let { Email, Name, Phone, Address } = req.body;
            if( !Email || !Name || !Phone || !Address) {
                return res.status(201).json({
                    Success: false,
                    Mess: 'Please enter full shipper information'
                })
            }

            if( req.user){
                let data = await ShipperService.createShipper(Email, Name, Phone, Address, req.user.shopId)
                if( data.Success === true ){
                    return res.status(201).json({ data: data })
                } else {
                    return res.status(201).json({ data: data })
                }
            } else {
                return res.status(401).json({
                    data: {
                        Success: false,
                        Mess: 'Not Authenticated the user'
                    }
                })
            }
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server aaa'
                }
            })
        }
    }

    async editShipper( req, res ){
        try{
            let { Email, Name, Phone, Address } = req.body;
            if( !Email || !Name || !Phone || !Address) {
                return res.status(201).json({
                    Success: false,
                    Mess: 'Please enter full shipper information'
                })
            }
            if( req.user){
                if( req.params){
                    let data = await ShipperService.editShipper(Email, Name, Phone, Address, req.params.idshipper,  req.user.shopId)
                    if( data.Success === true ){
                        return res.status(201).json({ data: data })
                    } else {
                        return res.status(201).json({ data: data })
                    }
                } else {
                    return res.status(201).json({
                        data: {
                            Success: false,
                            Mess: 'shipper does not exist'
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
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server aaa'
                }
            })
        }
    }

    async deleteShipper(req, res) {
        try{
            if( req.user){
                if( req.params){
                    let data = await ShipperService.deleteShipper( req.params.idshipper,  req.user.shopId)
                    if( data.Success === true ){
                        return res.status(201).json({ data: data })
                    } else {
                        return res.status(201).json({ data: data })
                    }
                } else {
                    return res.status(201).json({
                        data: {
                            Success: false,
                            Mess: 'shipper does not exist'
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
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server aaa'
                }
            })
        }
    }

    async showShipper( req, res ){
        try{
            if( req.user){
                let data = await ShipperService.showShipper(req.user.shopId)
                if( data.Success === true ){
                    return res.status(201).json({ data: data })
                } else {
                    return res.status(201).json({ data: data })
                }
            } else {
                return res.status(401).json({
                    data: {
                        Success: false,
                        Mess: 'Not Authenticated the user'
                    }
                })
            }
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server aaa'
                }
            })
        }
    }
}


module.exports = new ShiperController;
