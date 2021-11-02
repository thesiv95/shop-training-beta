const ApiError = require("../errors/ApiError");
const { Brand } = require("../models/models");

class BrandController {
    async addBrand(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.unprocessableEntity('Brand name is required'));
            }
            const brand = await Brand.create({ name });
            return res.status(201).json(brand);
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }

    async getBrands() {

    }
}

module.exports = BrandController;