const Comment = require('../models/comment');
const Bdd = require('../models/dbConnect');
const Error_management = require('../middleware/error-management');

exports.addComments = (req, res) => {
    Bdd.query(Comment.addComment(), [
        req.body.users_id,
        req.body.messages_id,
        req.body.content
    ],
        (err, result) => {
            if (err) {
                return res.status(400).json(Error_management.error(err.message));
            } else {
                return res.status(201).json(Error_management.success(result));
            }
        });
};

exports.getAllComments = (req, res) => {
}

exports.deleteComment = (req, res) => {
}