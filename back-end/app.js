const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const HELMET = require('helmet');
const USER = require('./routes/userRouter');
const MESSAGE = require('./routes/messageRouter');
const COMMENT = require('./routes/commentRouter');
const COMPRESSION = require('compression');
const APP = EXPRESS();

APP.use(COMPRESSION());
APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({ extended: false }));
APP.use(HELMET());

APP.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

APP.use("/api/user", USER);
APP.use("/api/forum", MESSAGE);
APP.use("/api/comment", COMMENT);

module.exports = APP;