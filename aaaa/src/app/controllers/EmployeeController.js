const employeeService = require('../../Services/EmployeeService');
const { format } = require('date-fns');
class EmployeeController {

    // [GET] /manager/api/showemployee
    async managerRole( req, res, next){
        try {
            if( req.query.page && req.query.limit ){
                let page = req.query.page;
                let limit = req.query.limit;
                if( req.user ){
                    const dataEmployee = await employeeService.getEmployeeWithPagination( page, limit, req.user.shopId );
                    // const dataEmployee = await employeeService.showEmployee(req.user.shopId);
                    return res.status(201).json({ data: dataEmployee})
                } else {
                    return res.status(401).json({
                        data: {
                            Success: false,
                            Mess: 'Not Authenticated the user'
                        }   
                    
                    })
                }
            } else {

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

    // [POST] /manager/api/createemployee
    async createEmployee( req, res, next){
        let { Email, Name,  Phone, Address, Description, ShopId} = req.body;
        if( !Name || !Address || !Phone || !Email ){
            return res.status(500).json({
                Success: false,
                Mess: ""
            })
        }
        let data = await employeeService.createEmployee(  Email, Name,  Phone, Address, Description, req.user.shopId);
        return res.status(200).json({data: data});
    }

    // [PUT] /manager/api/updateemploy/:id
    async updateEmploy( req, res, next) {
        let { Name, Phone, Address,Description} = req.body;
        let Id = req.params.id;
       
        if( req.user ){
            let data = await employeeService.updateEmployee(Id, Name, Phone , Address, Description, req.user.shopId)
            return res.status(200).json({data: data});
        } else {
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            
            })
        }
        
        return res.status(200).json({
            MES: 'OK'
        });
    }

    // [DELETE] /api/v1/mgr/deleteUser/
    async deleteEmployee( req, res, next ){
        let id = req.params.id;
        console.log("req.params.id", id)
        let data = await employeeService.deleteEmployee( id );
        return res.status(200).json({data: data });
    }

    
}

module.exports = new EmployeeController;