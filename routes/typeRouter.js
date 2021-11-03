const { Router } = require('express');
const TypeController = require('../controllers/typeController');
const router = new Router();
const checkRole = require('../middlewares/CheckRoleMiddleware');

const controller = new TypeController();

router.post('/', checkRole('ADMIN'), controller.addType);
router.get('/', controller.getTypes);

module.exports = router;