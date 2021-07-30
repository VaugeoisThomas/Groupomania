const JWT = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const AuthHeader = req.headers.authorization;
    if (AuthHeader) {
        const TOKEN_WEB = AuthHeader.split(' ')[1];
        JWT.verify(TOKEN_WEB, process.env.TOKEN, (err, user) => {
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