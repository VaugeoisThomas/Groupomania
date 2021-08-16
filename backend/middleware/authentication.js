const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth === "") {
        return res.status(500);
    }
    else if(auth){
        const tokenWeb = auth.split(' ')[1];
        jwt.verify(tokenWeb, process.env.TOKEN, (err, user) => {
            if (err) {
                return res.status(403);
            } else {
                req.id = user;
                next();
            }
        })
    } else return res.status(401);
}