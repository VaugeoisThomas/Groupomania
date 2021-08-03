const Jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const AuthHeader = req.headers.authorization;
    if (AuthHeader) {
        const token_web = AuthHeader.split(' ')[1];
        Jwt.verify(token_web, process.env.TOKEN, (err, user) => {
            if (err) {
                res.status(403);
            } else {
                req.id = user;
                next();
            }
        });
    } else {
        res.status(401);
    }
}