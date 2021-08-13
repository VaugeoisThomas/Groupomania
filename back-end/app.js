const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const user = require('./routes/userRouter');
const post = require('./routes/postRouter');
//const comment = require('./routes/commentRouter');
const compression = require('compression');
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api/user", user);
app.use("/api/post", post);
//app.use("/api/comment", comment);

module.exports = app;