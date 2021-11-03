const bcrypt = require('bcrypt');
const ApiError = require('../errors/ApiError');
const { User, Basket } = require('../models/models');
const generateJWT = require('../utils/generateJWT');

class UserController {

    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Incorrect email or password'));
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest('Email is already used'));
            }

            const encryptedPassword = await bcrypt.hash(password, +process.env.HASH_ROUNDS);
            const user = await User.create({ email, password: encryptedPassword, role });

            // Create a new basket for new user
            await Basket.create({ userId: user.id });

            const token = generateJWT(user.id, email, role);

            return res.status(201).json({ token });
        } catch (error) {
            return next(ApiError.internal(error));
        }

    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            const credentialsCorrect =
                user ? bcrypt.compareSync(password, user.password) : false;

            if (!credentialsCorrect) {
                return next(ApiError.badRequest('Login or password incorrect'));
            }

            const token = generateJWT(user.id, user.email, user.role);
            return res.status(200).json({ token });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }

    async check(req, res, next) {
        try {
            // Everytime token should be regenerated
            const token = generateJWT(req.id, req.user, req.role);
            return res.status(200).json({ token });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }
}

module.exports = UserController;