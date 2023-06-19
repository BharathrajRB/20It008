
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/data.config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "no token , authorization defined" });
    }

    try {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "token not valid" });
            }
            else {
                req.user = decoded.user;
                next();

            }
        });
    } catch (error) {
        res.status(500).json({ msg: "server error" + error.message });
    }
};