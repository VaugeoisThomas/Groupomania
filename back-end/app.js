const express = require('express');
const Body_parser = require('body-parser');
const helmet = require('helmet');
const User = require('./routes/userRouter');
const Message = require('./routes/messageRouter');
const Comment = require('./routes/commentRouter');
const compression = require('compression');
const App = express();

App.use(compression());
App.use(Body_parser.json());
App.use(Body_parser.urlencoded({ extended: false }));
App.use(helmet());

App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

App.use("/api/user", User);
App.use("/api/forum", Message);
App.use("/api/comment", Comment);

module.exports = App;