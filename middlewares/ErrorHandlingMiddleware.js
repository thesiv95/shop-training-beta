const ApiError = require('../errors/ApiError');

module.exports = function (err, req, res, next) {
    // if known code
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    // else
    return res.status(500).json({ message: 'Unexpected error' });
}