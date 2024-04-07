const ManagerService = require('../../Services/ManagerService');
const Category = require('../models/Category');

class ManagerController {

    // [POST] /api/v1/setcategory
    async setCategoryShop( req, res ){
        if( !req.body.category ){
            return res.status(200).json({
                Success: false,
                Mess: 'Please Input Category your Shop'
            })
        }
        let category = req.body.category;
        let data = await ManagerService.setCategoryShop( req.body, category );
        return res.status(200).json({
            data
        })
    }

    // [GET] /api/v1/manager/product/show
    async showProduct( req, res ){
        try {
            if( req.query.page && req.query.limit ){
                let page = req.query.page;
                let limit = req.query.limit;
              
                if( req.user ){
                    const dataProduct = await ManagerService.getProductWithPagination( page, limit, req.user.shopId );
                    // const dataEmployee = await employeeService.showEmployee(req.user.shopId);
                    return res.status(201).json({ data: dataProduct})
                } else {
                    return res.status(401).json({
                        data: {
                            Success: false,
                            Mess: 'Not Authenticated the user'
                        }   
                    
                    })
                }
            } else {
                return res.status(200).json({
                    data: {
                        Success: false,
                        Mess: 'NoData'
                    }
                })
            }
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    // [GET] /api/v1/mgr/get/product
    async getProduct( req, res ){
        try { 
            // const dataProduct = await ManagerService.showProduct( '65c7b25af490e447e54af806');
            //     if( dataProduct ){
            //         return res.status(200).json({data: dataProduct})
            //     }
            if( req.user ){
                const dataEmployee = await ManagerService.showProduct( req.user.shopId);
                console.log("prduct: ", dataEmployee)
                if( dataEmployee ){
                    return res.status(200).json({data: dataEmployee})
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
                Success: false,
                Mess: "Error from Server"
            })
        }
    }
    // [POST] /api/v1/manager/product/create
    async createProduct( req, res) {
        try {
            // Lấy email từ Cookies ở đây 
            let {Name, Price, ImageUrl, Description} = req.body
            if( !Name || !Price || !ImageUrl ){
                return res.status(200).json({
                    Success: false,
                    Mess: 'Please enter full product information'
                })
            }
            // let data = await ManagerService.createProduct( Name, Price, ImageUrl, Description, '65c7b25af490e447e54af806');
            // return res.status(200).json({data: data});

            if( req.user) {
                let data = await ManagerService.createProduct( Name, Price, ImageUrl, Description, req.user.shopId);
                return res.status(200).json({data: data});
            } 
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            
            })
            

        } catch ( error ){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server (controller)',
            })
        }
    }
    // [PUT] /api/v1/manager/product/update
    async updateProduct(req, res ){
        try {
            let {Name, Price, ImageUrl, Description} = req.body
            if( !Name || !Price || !ImageUrl ){
                return res.status(200).json({
                    Success: false,
                    Mess: 'Please enter full product information'
                })
            }
            
            console.log("Req User update Controller", req.user)
            console.log("req.body update product Controller:  ", req.body)
            if( req.user ){
                if( req.params.id){
                    let data = await ManagerService.updateProduct(req.params.id , Name, Price, ImageUrl, Description, req.user.shopId);
                    return res.status(200).json({data: data});
                } else {
                    return res.status(200).json({
                        Success: false,
                        Mess: 'No Data PRoduct'
                    })
                }
            }
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    // [DELETE] /api/v1/manager/product/:slugproduct/delete
    async deleteProuct( req, res){
        try {
            
            if( req.user){
                if( req.params.id){
                    let data = await ManagerService.deleteProduct(req.params.id ,req.user.shopId);
                    return res.status(200).json({data: data});
                } else {
                    return res.status(200).json({
                        Success: false,
                        Mess: 'No Data PRoduct'
                    })
                }
            } 
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    async getMethodPayment( req, res ){
        try {
            if( req.user ){
                let data = await ManagerService.getMethodPayment();
                return res.status(200).json({data: data});
            } 
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    async getStatusOrder(req, res){
        try {
            if( req.query.id){
                if( req.user ){
                    let data = await ManagerService.getStatusOrder(req.query.id, req.user.shopId);
                    return res.status(200).json({data: data});
                }
                return res.status(401).json({
                    data: {
                        Success: false,
                        Mess: 'Not Authenticated the user'
                    }
                })
            } else {
                return res.status(200).json({
                    Success: false,
                    Mess:'Vui lòng thử lại'
                })
            }
            
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    async getProductById( req, res ) {
        try {
            console.log("req.query.id", req.query.id)
            if( req.query.id) {
                if( req.user) {
                    let data = await ManagerService.getProductById( req.query.id, req.user.shopId);
                    if( data.Success === true ){
                        return res.status(200).json({
                            data: data
                        })
                    } else {
                        return res.status(200).json({
                            data: data
                        })
                    }
                } else {
                    return res.status(401).json({
                        Success: false,
                        Mess: 'Unauthorzied the user. Please Login'
                    })
                }
            } else {
                return res.status(200).json({
                    Success: false,
                    Mess: 'không tìm thấy khách hàng'
                })
            }
        } catch ( error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })
        }
    }

    async getMethodPaymentById( req, res ){
        try {
            console.log('req.query.id method', req.query.id)
            if(req.query.id){
                if( req.user){
                    let data = await ManagerService.getMethodPaymentById( req.query.id, req.user.shopId);
                    if( data.Success === true ){
                        return res.status(200).json({data: data})
                    } else {
                        return res.status(200).json({data: data})
                    }
                } else {
                    return res.status(401).json({
                        Success: false,
                        Mess: 'Unauthorzied the user. Please Login'
                    })
                }
            } else {
                return res.status(200).json({
                    Success: false,
                    Mess: 'không tìm thấy Phương thức thanh toán'
                })
            }
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })  
        }
    }

    async getReportSalesWeek( req, res ){
        try {
            console.log("req.user.shopId sale", req.user.shopId)
            if(req.user) {
                let data = await ManagerService.getReportSalesWeek(req.user.shopId);
                return res.status(200).json({data: data})
            } else {
                return res.status(401).json({
                    Success: false,
                    Mess: 'Unauthorzied the user. Please Login'
                })
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                data: {
                    Success: false,
                    Mess: 'Error from Server'
                }
            })  
        }
    }
}

module.exports = new ManagerController;