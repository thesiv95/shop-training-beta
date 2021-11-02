const { Router } = require('express');
const router = new Router();
const BrandController = require('../controllers/brandController');

const controller = new BrandController;

router.post('/', controller.addBrand);
router.get('/', controller.getBrands);

module.exports = router;