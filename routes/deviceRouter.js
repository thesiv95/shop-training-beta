const { Router } = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');
const checkRole = require('../middlewares/CheckRoleMiddleware');

const controller = new DeviceController();

router.post('/', checkRole('ADMIN'), controller.addDevice);
router.get('/', controller.getDevices);
router.get('/:id', controller.getOneDevice);

module.exports = router;