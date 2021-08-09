const comment = require('../models/comment');
const bdd = require('../config/database');
const error_management = require('../middleware/error-management');

//ADD A COMMENT
exports.addComments = (req, res) => {
    bdd.query(comment.addComment(), [req.body.users_id, req.body.messages_id, req.body.content], (err, result) => {
        return(err ? res.status(400).json(error_management.error(err.message)) : res.status(201).json(error_management.success(result)));
    });
};

//GET ALL COMMENTS SORT BY USERS
exports.getAllComments = (req, res) => {
    if(req.query.max != undefined && req.query.max > 0){
        bdd.query(comment.getCommentWithMaxValue(), req.query.max, (err, result) => {
            return(err ? res.status(400).json(error_management.error(err.message)) : res.status(200).json(error_management.success(result)));
        });
    } else if(req.query.max != undefined) return res.status(404).json(error_management.error('Valeur "max" erronée !'));
    else {
        bdd.query(comment.getCommentsByUserId(), (err, result) => {
            return(err ? res.status(400).json(error_management.error(err.message)) : res.status(200).json(error_management.success(result)));
        });
    }
};

exports.getCommentForOneMessage = (req, res) => {
    console.log(req);
/*     if(req.params.id) {
        bdd.query(comment.getCommentByMessages(), req.params.id, (err, result) => {
            return (err ? res.status(500).json(error_management.error(err)) : res.status(200).json(error_management.success(result)));
        });
    } else return res.status(404).json(error_management.error("Aucun commentaire n'a été trouvé pour ce message !")) */
}


//DELETE A COMMENT
exports.deleteComment = (req, res) => {
    bdd.query(comment.getCommentById(), req.params.id, (err, result) => {
        if(err) return res.status(500).json(error_management.error(err.message));
        else{
            if(result[0] != undefined){
                if(req.params.id === result[0].id){
                    bdd.query(comment.deleteComment(), req.params.id, (err, result) => {
                        return (err ? res.status(403).json(error_management.error(err.message)) : res.status(200).json(error_management.success(result)));
                    });
                } else return res.status(403).json(error_management.error('Vous ne pouvez pas supprimer ce commentaire !'));
            } else return res.status(404).json(error_management.error('Ce commentaire est introuvable.'));
        }
    })
};