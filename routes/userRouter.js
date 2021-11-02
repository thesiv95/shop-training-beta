const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/userController');

const controller = new UserController();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', controller.auth);

module.exports = router;