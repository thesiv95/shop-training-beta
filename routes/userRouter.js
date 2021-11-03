const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/AuthMiddleware');

const controller = new UserController();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.check);

module.exports = router;