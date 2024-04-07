const express = require('express');
const router = express.Router();
const AppController = require('../app/controllers/AppController');
const {checkJWTApp} = require('../middleware/middlewareApp');

router.post('/login/app', AppController.handlerLoginApp);
router.put('/update/status/online/:email', AppController.updateStatusUpdate)
router.post('/show/order/:status', checkJWTApp, AppController.showOrderWithStatus)
router.put('/update/status/order/successfully/:orderId', checkJWTApp, AppController.updateStatusOrder)

module.exports = router;