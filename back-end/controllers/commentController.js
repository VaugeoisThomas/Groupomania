const Comment = require('../models/comment');
const Bdd = require('../models/dbConnect');
const Error_management = require('../middleware/error-management');

//ADD A COMMENT
exports.addComments = (req, res) => {
    Bdd.query(Comment.addComment(), [req.body.users_id, req.body.messages_id, req.body.content], (err, result) => {
            return(err ? res.status(400).json(Error_management.error(err.message)) : res.status(201).json(Error_management.success(result)));
        });
};

//GET ALL COMMENTS SORT BY USERS
exports.getAllComments = (req, res) => {
    if(req.query.max != undefined && req.query.max > 0){
        Bdd.query(Comment.getCommentWithMaxValue(), req.query.max, (err, result) => {
            return(err ? res.status(400).json(Error_management.error(err.message)) : res.status(200).json(Error_management.success(result)));
        });
    } else if(req.query.max != undefined) return res.status(404).json(Error_management.error('Valeur "max" erronée !'));
    else {
        Bdd.query(Comment.getCommentsByUserId(), (err, result) => {
            return(err ? res.status(400).json(Error_management.error(err.message)) : res.status(200).json(Error_management.success(result)));
        });
    }
};

//DELETE A COMMENT
exports.deleteComment = (req, res) => {
    Bdd.query(Comment.getCommentById(), req.params.id, (err, result) => {
        if(err) return res.status(500).json(Error_management.error(err.message));
        else{
            if(result[0] != undefined){
                if(req.params.id === result[0].id){
                    Bdd.query(Comment.deleteComment(), req.params.id, (err, result) => {
                        return (err ? res.status(403).json(Error_management.error(err.message)) : res.status(200).json(Error_management.success(result)));
                    });
                } else return res.status(403).json(Error_management.error('Vous ne pouvez pas supprimer ce commentaire !'));
            } else return res.status(404).json(Error_management.error('Ce commentaire est introuvable.'));
        }
    })
};