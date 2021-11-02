const ApiError = require('../errors/ApiError');
const { Type } = require('../models/models');

class TypeController {
    async addType(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.unprocessableEntity('Name is required'));
            }
            const type = await Type.create({ name });
            return res.status(201).json({ type });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }

    async getTypes(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.status(200).json({ types });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }
}

module.exports = TypeController;