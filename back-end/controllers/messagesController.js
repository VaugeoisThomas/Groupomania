const Messages = require('../models/messages');
const bdd = require('../models/dbConnect');
const { error, success } = require("../middleware/error-management");

exports.getAllMessages = (req, res) => {
    bdd.query(Message.getAllMessages(), (err, result) => {
        if(err) {
            throw err;
        } else {
            res.status(201).json(result)
        }
    });
};