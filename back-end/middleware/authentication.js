const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token_web = auth.split(' ')[1];
        jwt.verify(token_web, process.env.TOKEN, (err, user) => {
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