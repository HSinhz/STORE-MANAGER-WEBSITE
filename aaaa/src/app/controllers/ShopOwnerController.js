const shopOwnerService = require('../../services/ShopOwnerService')

class ShopOwnerController {

    home( req, res ){
        return res.status(200).json({
            data: 'OKKK'
        })
    }
    async handlerRegister( req, res, next){
        console.log('Data Register: ', req.body);
        const { Name, Email, Password, Phone, Address, ShopName, ShopAddress  } = req.body;
        if( !Name || !Email || !Password || !Phone||!Address || !ShopName || !ShopAddress ){
            return res.status(400).json({
                Success : false,
                Data: ""
            })
        }
        let data = await shopOwnerService.createShopOwner(Name, Email, Password, Phone, Address, ShopName, ShopAddress );
        console.log(data)
        if( data.Success ){
            res.redirect(`/api/v1/generate`);
        } else {
            return res.status(201).json( {data: data});
        }
    }
    
    async showProfile( req, res, next ){
        let id = req.params.id;
        let data = await shopOwnerService.getProfileShopOwner( id );
        if( data.Success ){
            return res.status(201).json( data );
        } 
        return res.status(400).json( data );
    }

    async updateProfile( req, res, next ){
        const { Name , Phone } = req.body;
        if( !Name || !Phone  ){
            return res.status(400).json({
                Success : false,
                Data: ""
            })
        }
        let data = await shopOwnerService.updateProfileShopOwner(req.params.id, req.body );
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data);  
    }
    
    async deleteProfile( req, res, next ){
        let data = await shopOwnerService.deleteProfile( req.params.id);
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data); 
    }

    async updatePassword( req, res, next ){
        let { Oldpass, Newpass, ConfirmNewPass } = req.body;
        if( !Oldpass || !Newpass || !ConfirmNewPass ){
            return res.status(400).json({
                Success : false,
                Mess: 'Please enter complete information'
        })}
        let data = await shopOwnerService.updatePass( req.params.id, Oldpass, Newpass, ConfirmNewPass);
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data); 
    }
}

module.exports = new ShopOwnerController;

