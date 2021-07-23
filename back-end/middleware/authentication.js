const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const AuthHeader = req.headers.authorization;
    if (AuthHeader) {
        const token = AuthHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if (err) {
                res.status(403);
            } else {
                req.userId = user;
                next();
            }
        });
    } else {
        res.status(401);
    }
}