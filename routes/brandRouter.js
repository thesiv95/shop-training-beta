const { Router } = require('express');
const router = new Router();
const BrandController = require('../controllers/brandController');
const checkRole = require('../middlewares/CheckRoleMiddleware');

const controller = new BrandController;

router.post('/', checkRole('ADMIN'), controller.addBrand);
router.get('/', controller.getBrands);

module.exports = router;