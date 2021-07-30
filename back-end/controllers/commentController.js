const COMMENT = require('../models/comment');
const BDD = require('../models/dbConnect');
const ERROR_MANAGEMENT = require('../middleware/error-management');

exports.addComments = (req, res) => {
    BDD.query(COMMENT.addComment(), [
        req.body.users_id,
        req.body.messages_id,
        req.body.content
    ],
        (err, result) => {
            if (err) {
                return res.status(400).json(ERROR_MANAGEMENT.error(err.message));
            } else {
                return res.status(201).json(ERROR_MANAGEMENT.success(result));
            }
        });
};

exports.getAllComments = (req, res) => {
}

exports.deleteComment = (req, res) => {
}