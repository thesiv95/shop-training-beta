class DeviceController {
    async addDevice() {

    }

    async getDevices(req, res) {
        return res.json({ 'endpointWorks': true });
    }
}

module.exports = DeviceController;