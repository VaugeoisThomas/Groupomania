const db = require('../models');
const statusManagement = require('../middleware/statusManagement');

//ADD A COMMENT
exports.addComments = (req, res) => {
    const {UserId, PostId, content} = req.body;
    let newComment =  db.Comments.create({
        UserId      : UserId, 
        PostId      : PostId, 
        content     : content
    })
    .then(() => {
        return res.status(201).json(statusManagement.success(newComment));
    })
    .catch((err) => {
        return res.status(400).json(statusManagement.error(`Une erreur est survenue lors de l'envois du commentaire: ${err}`));
    })
};

//GET ALL COMMENTS SORT BY USERS
exports.getAllComments = (req, res) => {
    db.Comments.findAll({
        include: [{
            model: db.Users,
            attributes: ['id', 'username', 'isAdmin']
        }, {
            model: db.Posts,
            attributes: ['id', 'content']
        }]
    })
    .then(comments => { 
        return res.status(200).json(statusManagement.success(comments));
    })
    .catch(err => { 
        return res.status(500).json(statusManagement.error(err.message));
    })
};

exports.getCommentForOneMessage = (req, res) => {
    const {id} = req.params
     if(id) {
        db.Comments.count({
            where: {
                PostId: id
            }
        })
        .then((result) => {
            res.status(200).json(statusManagement.success(result))
        })
        .catch((err) => {
            return res.status(500).json(statusManagement.error(err))
        });
    } else {
        return res.status(404).json(statusManagement.error("Aucun commentaire n'a été trouvé pour ce message !"));
    }
}


//DELETE A COMMENT
exports.deleteComment = (req, res) => {

    const{postId, id} = req.params;
    const{UserId} = req.body;

    db.Comments.findOne({
        include: [
            {
                model: db.Users,
                attributes: ['id', 'isAdmin']
            }, 
            {
                model: db.Posts,
                attributes: ['id']
            }   
        ],
        where: {
            id: id,
            PostId: postId
        }
    })
    .then(commentFounded => {
        if(commentFounded === null){
            return res.status(500).json(statusManagement.error("Un problème est survenu !"))
        } else {
            if(commentFounded.User.id === UserId || commentFounded.User.isAdmin === 1){
                
                db.Comments.destroy({
                    attributes: id,
                    where: {
                        id: id
                    }
                })
                .then(() => { 
                    return res.status(200).json(statusManagement.success("Commentaire supprimé !"));
                })
                .catch(err => { 
                    return res.status(500).json(statusManagement.error(`Impossible de supprimer le commentaire: ${err} `))
                })
            } else {
                return res.status(403).json(error_management.error('Vous ne pouvez pas supprimer ce commentaire !'));
            }
        }
    })
    .catch(err => {
        return res.status(401).json(statusManagement.error(`Nous n'avons pas trouvé le commentaire : ${err}`));
    })
};