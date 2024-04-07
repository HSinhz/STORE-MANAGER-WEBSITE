require("dotenv").config();
const { startOfWeek, endOfWeek, getISOWeek, subWeeks,addDays  } = require('date-fns');
const ShopOwner = require('../app/models/ShopOwner');
const Category = require('../app/models/Category');
const Product = require('../app/models/Product');
const Status = require('../app/models/Status');
const PaymentMethod = require('../app/models/PaymentMethod');
const Order = require("../app/models/Order");

const setCategoryShop = async ( userData, category) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({Email:userData.Email});
        if( existShopOwner ){
            let existShopOwnerCategory = await Category.findOne({ShopId: existShopOwner._id, Name: category});
            if( existShopOwnerCategory ){
                data = {
                    Success: false,
                    Mess: 'This type of shop already exists'
                }
            } else {
                await Category({
                    ShopId: existShopOwner._id,
                    Name: category,
                    Description: userData.Description
                }).save().then(() => 
                    console.log(`Created Successfully Category Shop with ShopId ${existShopOwner._id}`),   
                )
                data = { 
                    Success: true,
                    Mess: 'Successfully Create ShopCategory'
                }
            }
        } else {
            data = {
                Success: false,
                Mess: 'Shop does not exist'
            }
        }
        console.log(data);
        return data;
    } catch ( error ){
        console.log(error);
        return {
            Success: false,
            Mess: "Error from server"
        }
    }
} 

const createProduct = async( Name, Price, ImageUrl, Description, ShopId) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ){
            let newProduct = new Product({
                ShopId: ShopId,
                Name: Name,
                Price: Price,
                ImageUrl: ImageUrl,
                Description: Description
            }).save().then(() => console.log("Create Product Successfully"));
            data = {
                Success: true,
                Mess: "Successfully Create New Product"
            }
        } else {
            data = {
                Success: false,
                Mess: 'ShopOwner is not exist'
            }
        }
        return data;
    } catch ( error ){
        console.log(error)
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

const showProduct = async ( shopId) => {
    try {
        
        let dataProduct = await Product.find({ShopId: shopId});
        console.log("product:", dataProduct)
        return {
            Success: true,
            Mess: dataProduct
        }
    } catch( error ) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error From Server'
        }
    }
}

async function getProductWithPagination( page, limit, shopId) {
    try {
        let offset = (page - 1) * limit;
        const count = await Product.find({ShopId: shopId}).countDocuments();
        const products = await Product.find({ShopId: shopId}).select('_id Name CategoryId Price ImageUrl Description').skip(offset).limit(limit);
        // console.log("Product Service: ", products)
        let totalPages = Math.ceil(parseInt(count)/limit);
        let data = {
            Success: true,
            Mess: 'Show All Employee',
            totalPages: totalPages,
            allProduct: products,
        }
        return data;
    } catch ( error ){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server',
        }
    }
}

const updateProduct = async (ProductId ,Name, Price, ImageUrl, Description, ShopId) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ){
            let existProduct = await Product.findOne({_id:ProductId });
            if(existProduct ){
                await Product.updateOne({_id: ProductId},{
                    Name: Name,
                    Price: Price,
                    ImageUrl: ImageUrl,
                    Description: Description
                }).then(() => console.log("SuccessFully Update Product"));
                data = {
                    Success: true,
                    Mess: 'Successfully Update Product'
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'Product is not Exist'
                }
            }
        } else {
            data = {
                Success: false,
                Mess: 'ShopOwner is not Exist'
            }
        }
        return data;
    } catch ( error ) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server',
        }
    }
}

const deleteProduct = async (productId, shopId) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: shopId});
        if( existShopOwner ){
            let existProduct = await Product.findOne({_id:productId });
            if(existProduct ){
                await Product.deleteOne({_id: productId}).then(() => console.log(`Successfully Delete Product with ${productId.toString()}`));
                data = {
                    Success: true,
                    Mess: 'Successfully Delete Product'
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'Product is not Exist'
                }
            }
        } else {
            data = {
                Success: false,
                Mess: 'ShopOwner is not Exist'
            }
        }
        return data;
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from Server',
        } 
    }
}


const getMethodPayment = async () => {
    try {
        let method = await PaymentMethod.find();
        return {
            Success: true,
            Mess: "Successfully",
            allMethod: method
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

const getStatusOrder = async (StatusId ,ShopId) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ){
            let status = await Status.findOne({ idstatus: StatusId}).select('idstatus Name');
            data = {
                Success: true,
                Mess: "Successfully",
                allStatus: status
            }
        } else {
            data = {
                Success: false,
                Mess: 'Cửa hàng không tồn tại'
            }
        }
        
        return data;
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

const getProductById = async (ProductId, ShopId) => {
    try {
        let data = {};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner){
            let existProduct = await Product.findOne({_id: ProductId}).select('Name ImageUrl');
            if( existProduct ) {
                data = {
                    Success: true,
                    Mess: 'Data Product',
                    Product: existProduct
                }
            } else {
                data= {
                    Success: false,
                    Mess: 'Product is not exist'
                }
            }
        } else {
            data = {
                Success: false,
                Mess: 'Cửa hàng không tồn tại'
            }
        }
        return data;
    } catch ( error ){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

const getMethodPaymentById = async (MethodId, ShopId) => {
    try {
        let data ={};
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if( existShopOwner ){
            let existMethod = await PaymentMethod.findOne({IdMethod: MethodId});
            console.log('existMethod', MethodId)
            if(existMethod) {
                data = {
                    Success: true,
                    Mess: 'Successfully',
                    Method: existMethod,
                }
                return data;
            }
            return {
                Success: false,
                Mess: 'Không tìm thấy phương thức thanh toán'
            }
        }
        return {
            Success: false,
            Mess: 'Cửa hàng không tồn tại'
        }
         
    } catch (error ){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}

const getReportSalesWeek = async (ShopId) => {
        try{
            let existShopOwner = await ShopOwner.findOne({_id: ShopId});
            if(existShopOwner){
                let salesByWeek = [];
                let currentWeek = getISOWeek(new Date());
                for (let i = 1; i < currentWeek; i++) { // Lấy 12 tuần trước
                    let startDate = startOfWeek(subWeeks(new Date(), i)); // Ngày bắt đầu của tuần
                    let start = addDays(startDate, 2); // Di chuyển từ Chủ Nhật sang Thứ Hai
                    let endDate = endOfWeek(subWeeks(new Date(), i)); // Ngày kết thúc của tuần
                    let end = addDays(endDate, 2); // Di chuyển từ Chủ Nhật sang Thứ Hai
                    let totalSales = await Order.aggregate([
                        {
                            $match: {
                                ShopId: ShopId,
                                createdAt: {
                                    $gte: start,
                                    $lte: end
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalSales: { $sum: "$TotalAmount" },
                            }
                        }
                    ]);
            
                    // Thêm kết quả vào mảng salesByWeek
                    salesByWeek.push({
                        week: currentWeek - i, // Lấy số tuần dựa trên thời gian hiện tại
                        startDate: start,
                        endDate: end,
                        totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,

                    });
                }
                return {
                    Success: true,
                    Sales: salesByWeek
                }
            } 
            return {
                Success: false,
                Mess: 'ShopOwner is not exist'
            }
        } catch( error ){
            console.log(error);
            return {
                Success: false,
                Mess: 'Error from server'
            }
        }
}
module.exports = {
    setCategoryShop,
    createProduct,
    showProduct,
    getProductWithPagination,
    updateProduct,
    deleteProduct,
    getMethodPayment,
    getStatusOrder,
    getProductById,
    getMethodPaymentById,
    getReportSalesWeek
}