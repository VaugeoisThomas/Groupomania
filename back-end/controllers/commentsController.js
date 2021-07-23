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
            return res.status(400).json(errManagement.error(err.message));
        } else {
            return res.status(201).json(errManagement.success("Votre commentaire à été ajouté"));
        }
    });
};

exports.getAllComments = (req, res) => {
}

exports.deleteComment = (req, res) => {
    bdd.query(Users.selectUsersById, req.userId, (err, result) => {
        if(err) {
            return res.status(400).json(errManagement.error(err.message));
        } else {
            if(result[0] != undefined) {
                const User = result[0]
                bdd.query(Comments.selectOneComment, req.params.id, (err, res) => {
                    if(err) {
                      return res.status(404).json(errManagement.error(err.message));  
                    } else {
                        if(req.body.users_id == result[0].users_id || User.isAdmin == 1){
                            bdd.query(Comments.deleteComment, req.params.id, (err, res) => {
                                if(err){
                                    return res.status(400).json(errManagement.error(err.message));
                                } else {
                                    return res.status(200).json(errManagement.success("Commantaire supprimé"));
                                }
                            });
                        } else {
                            return res.status(403).json(errManagement.error("Vous ne pouvez pas supprimer ce commentaire"));
                        }
                    }
                });
            } else {
                return res.status(404).json(errManagement.error("Commentaire introuvable !"))
            }
        }
    })
}