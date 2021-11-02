const { Router } = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');

const controller = new DeviceController();

router.post('/', controller.addDevice);
router.get('/', controller.getDevices);
router.get('/:id', controller.getOneDevice);

module.exports = router;