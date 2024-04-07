const express = require('express');
const router = express.Router();
const managerController = require('../app/controllers/managerController');
const employeeController = require('../app/controllers/EmployeeController')
const orderController = require('../app/controllers/OrderController');
const ShiperController = require('../app/controllers/ShipperController')
const CustomerController = require('../app/controllers/CustomerController')
const { checkUserJWT, checkPermissionUser} = require('../middleware/verifyJWT');


// check middleware cho tất cả các route
// Product
router.post('/setcategory',checkUserJWT, checkPermissionUser, managerController.setCategoryShop);
router.get('/mgr/product/show', checkUserJWT, checkPermissionUser,managerController.showProduct );
router.get('/mgr/get/product', checkUserJWT, checkPermissionUser,managerController.getProduct );
router.post('/mgr/product/create', checkUserJWT, checkPermissionUser,managerController.createProduct);
router.put('/mgr/product/:id/update', checkUserJWT, checkPermissionUser,managerController.updateProduct);
router.delete('/mgr/product/:id/delete', checkUserJWT, checkPermissionUser,managerController.deleteProuct);
router.get('/mgr/methodpayment/show', checkUserJWT, checkPermissionUser,managerController.getMethodPayment);
router.get('/mgr/get/order/status', checkUserJWT, checkPermissionUser,managerController.getStatusOrder);
router.get('/mgr/get/product/order', checkUserJWT, checkPermissionUser,managerController.getProductById );
router.get('/mgr/get/order/method/payment', checkUserJWT, checkPermissionUser,managerController.getMethodPaymentById);
// Employee
router.post('/mgr/createemployee',checkUserJWT, checkPermissionUser, employeeController.createEmployee);  
router.get('/mgr/Employee' , checkUserJWT, checkPermissionUser,employeeController.managerRole);
router.put('/mgr/updateemployee/:id', checkUserJWT, checkPermissionUser,employeeController.updateEmploy);  
router.delete('/mgr/deleteemployee/:id', checkUserJWT, checkPermissionUser,employeeController.deleteEmployee);

// Order
router.get('/mgr/show/order', checkUserJWT, checkPermissionUser,orderController.showOrder);
router.post('/mgr/create/order', checkUserJWT, checkPermissionUser,orderController.createOrder);
router.put('/mgr/edit/order/:id', checkUserJWT, checkPermissionUser,orderController.editOrder);


// Shipper
router.post('/mgr/create/shipper', checkUserJWT, checkPermissionUser,ShiperController.createShipper );
router.get('/mgr/show/shipper', checkUserJWT, checkPermissionUser,ShiperController.showShipper );
router.put('/mgr/edit/shipper/:idshipper', checkUserJWT, checkPermissionUser,ShiperController.editShipper);
router.delete('/mgr/delete/shipper/:idshipper',checkUserJWT, checkPermissionUser, ShiperController.deleteShipper);

// customer 
router.get('/mgr/get/customer', checkUserJWT, checkPermissionUser,CustomerController.getCustomerById);

// Report sales
router.get('/mgr/get/sales/week',checkUserJWT, checkPermissionUser, managerController.getReportSalesWeek)
module.exports = router;