const ApiError = require("../errors/ApiError");

class DeviceController {
    async addDevice(req, res, next) {
        const { device } = req.body;
        if (!device) {
            return next(ApiError.unprocessableEntity('Device is required'));
        }
        return res.json({ device });
    }

    async getDevices(req, res) {
        return res.json({ 'endpointWorks': true });
    }
}

module.exports = DeviceController;