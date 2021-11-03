module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') next();

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) throw new Error();

            const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (decodedUser.role !== role) {
                return next(ApiError.forbidden(`No access`));
            }

            req.user = decodedUser;

            next();

        } catch (error) {
            return next(ApiError.unauthorized(`User was not authorized`));
        }
    }
}

