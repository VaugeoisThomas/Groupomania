const Comments = require('../models/comments');
const Users = require('../models/users')
const bdd = require('../models/dbConnect');
const errManagement = require('../middleware/error-management');

exports.addComments = (req, res) => {
    bdd.query(Comments.addComment(), [
        req.body_comment.users_id,
        req.body.comment.messages_id,
        req.body.comment_content
    ],
    (err, result) => {
        if(err){
            res.status(400).json(errManagement.error(err.message));
        } else {
            res.status(201).json(errManagement.success("Votre commentaire à été ajouté"));
        }
    });
};

exports.getAllComments = (req, res) => {
}

exports.deleteComment = (req, res) => {
    bdd.query(Users.selectUsersById, req.userId, (err, result) => {
        if(err) {
            res.status(400).json(errManagement.error(err.message));
        } else {
            if(result[0] != undefined) {
                bdd.query(Comments.selectOneComment, req.params.id, (err, res) => {
                    if(err) {
                        
                    }
                })
            }
        }
    })
}