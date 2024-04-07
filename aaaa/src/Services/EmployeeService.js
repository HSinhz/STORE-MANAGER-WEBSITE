require("dotenv").config();
const Employee = require('../app/models/Employee');

async function getEmployeeWithPagination ( page, limit , shopId) {
    try {
        let offset = (page - 1) * limit;
        const count = await Employee.find({ShopId: shopId}).countDocuments();
        const employees = await Employee.find({ ShopId: shopId }).select('Name _id Email Phone Address Role Description').skip(offset).limit(limit);
        // Làm tròn trang
        let totalPages = Math.ceil(parseInt(count)/limit);
        let data = {   
            Success: true,
            Mess: 'Show All Employee',
            totalPages: totalPages,
            allEmployee: employees,
        }
        return data;
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server',
        }
    } 
}

async function showEmployee(shopId){
    
    try {
        const allEmployee = await Employee.find({ShopId: shopId}).select('Name _id Email Phone Address Description');
        return {
            Success: true,
            Mess: 'Show All Employee',
            Data:  allEmployee
        }
    
    } catch ( error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server',
        }
    }
    
}

async function createEmployee ( Email, Name,  Phone, Address, Description, ShopId) {
    return new Promise( async (resolve, reject) => {
        try{
            let data = {};
            let existEmployee = await Employee.findOne( {Email});
            if( existEmployee ){
                data = {
                    Success: false,
                    MES: "Employee is exist"
                }
            } else {
                let newEmployee = new Employee({
                    ShopId: ShopId,
                    Name: Name,
                    Email: Email,
                    Phone: Phone,
                    Address: Address,
                    Description: Description,
                    Online: false
                })
                let document = await newEmployee.save();
                data = {
                    Success: true,
                    MES: "Succesfully Created Employed"
                }
                console.log(`Created New Employee with ${document._id.toString()}`);
            } 
            resolve(data);
        } catch ( error){
            reject(error);
        }
    })
}

async function updateEmployee(Id, Name, Phone , Address, Description, ShopId) {
    return new Promise( async (resolve, reject) => {
        try {
            let data = {};
            let existEmployee = await Employee.findOne({_id: Id});
            if( existEmployee ){
                    await Employee.updateOne({_id: Id}, {
                        Name: Name,
                        Phone: Phone,
                        Address: Address,
                        Description: Description
                    }).then( () => console.log("Chỉnh sửa nhân viên thành công"));
                    data = {
                        Success: true,
                        Mess: 'Successfully Update Employee'
                    }
                
            } else {
                data = {
                    Success: false,
                    Mess: "Employee is not exist"
                }
            }
            resolve(data)
        } catch (error) {
            data = {
                Success: false,
                Mess: "employee is not exist"
            }
            resolve(data);
            console.log('ERROR: _id is not Object')
        }
    })

}

async function deleteEmployee( Id ){
    return new Promise( async (resolve, reject) => {
        try {
            let data = {}
            await Employee.deleteOne({ _id : Id });
            data = {
                Success: true,
                Mess: "Successfully"
            }
            if( data.Success) {
                console.log("Deleted Employee with _id: ", Id);
            } else {
                console.log("Delete Fail !!!")
            }
            resolve( data);
        } catch ( error ){
            data = {
                ER: false,
                MES: "employee is not exist"
            }
            resolve(data);
            console.log('ERROR: _id is not Object')
        }

    })
}
module.exports = {
    createEmployee: createEmployee,
    showEmployee: showEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    getEmployeeWithPagination: getEmployeeWithPagination
    
}