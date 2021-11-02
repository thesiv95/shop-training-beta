const { Router } = require('express');
const TypeController = require('../controllers/typeController');
const router = new Router();

const controller = new TypeController();

router.post('/', controller.addType);
router.get('/', controller.getTypes);

module.exports = router;