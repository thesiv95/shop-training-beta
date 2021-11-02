const path = require('path');
const { nanoid } = require('nanoid');
const ApiError = require("../errors/ApiError");
const { Device } = require("../models/models");

class DeviceController {

    async addDevice(req, res, next) {
        try {
            const {
                name,
                price,
                brandId,
                typeId
            } = req.body;

            // Img upload
            const { img } = req.files;
            const fileName = `pic-${Date.now()}-${nanoid()}.jpg`;
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName,
            });
            return res.status(201).json(device);
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }

    async getDevices(req, res, next) {
        try {
            const {
                typeId,
                brandId,
                page = 1,
                perPage = 10 // limit
            } = req.query;

            const offset = page * perPage - perPage;

            let filterQuery;

            if (!typeId && !brandId) filterQuery = {};
            if (typeId && !brandId) filterQuery = { where: { typeId } };
            if (!typeId && brandId) filterQuery = { where: { brandId } };
            if (typeId && brandId) filterQuery = { where: { typeId, brandId } };

            const [devices, devicesQuantity] = await Promise.all([
                Device.findAll({
                    ...filterQuery,
                    limit: perPage,
                    offset,
                }),
                Device.count(filterQuery),
            ]);
            return res.status(200).json({ devices, devicesQuantity });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }

    async getOneDevice(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.findByPk(id);
            return res.status(200).json({ device });
        } catch (error) {
            return next(ApiError.internal(error));
        }
    }
}

module.exports = DeviceController;