const jwt = require('jsonwebtoken');

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

module.exports = generateJWT;