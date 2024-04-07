const express = require('express');
const router = express.Router();

const shopOwnerController = require('../app/controllers/ShopOwnerController');
const { checkUserJWT, checkPermissionUser } = require('../middleware/verifyJWT');
const { checkUserLogin} = require('../middleware/checkUserLogin')

router.post('/shopowner/register', shopOwnerController.handlerRegister);
router.get('/home', shopOwnerController.home);

router.get('/shopowner/show/:id',checkUserJWT,checkPermissionUser , shopOwnerController.showProfile);
router.put('/shopowner/:id/update',checkUserJWT,checkPermissionUser ,shopOwnerController.updateProfile);
router.delete('/shopowner/:id/delete',checkUserJWT,checkPermissionUser ,shopOwnerController.deleteProfile);
router.put('/shopowner/:id/update/password', checkUserJWT,checkPermissionUser ,  shopOwnerController.updatePassword);

module.exports = router;