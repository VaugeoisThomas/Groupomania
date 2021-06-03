const Messages = require('../models/messages');
const bdd = require('../models/dbConnect')

exports.getAllMessages = (req, res) => {
    bdd.query(Messages.getAllMessages(), (err, result) => {
        if(err) {
            throw err;
        } else {
            return res.status(201).json(result)
        }
    });
};