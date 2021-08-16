const db = require('../models');
const statusManagement = require('../middleware/statusManagement');

exports.getAllPosts = (req, res) => {
    db.Posts.findAll({
        include: [{
            model: db.Users,
            attributes: ['id', 'username', 'isAdmin']
        }]
    })
    .then(posts => { 
        return res.status(200).json(statusManagement.success(posts));
    })
    .catch(err => { 
        return res.status(500).json(error_management.error(err.message));
    })
};

exports.deletePost = (req, res) => {
    const {id} = req.params;
    const {UserId} = req.body;
    db.Posts.findOne({ 
        include: [{
            model: db.Users,
            attributes: ['isAdmin']
        }],
        where:{
            id:id,
        }
    })
    .then(postFounded => { 
        if(UserId == postFounded.UserId || postFounded.User.isAdmin == 1){
            db.Posts.destroy({
                attributes: id, 
                where:{
                    id:postFounded.id
                }
            })
            .then(() => { return res.status(200).json(statusManagement.success("Message supprimé !"))})
            .catch(err => { return res.status(500).json(statusManagement.error(`Impossible de supprimer le message: ${err} `))})
        } else return res.status(401).json(statusManagement.error("Vous ne pouvez pas supprimer ce message !"));
    })
    .catch(err => { return res.status(500).json(statusManagement.error(`Une erreur est survenue: ${err}`))});
};

exports.addPost = (req, res) => { 
    const {UserId, content} = req.body;

        let newPost = db.Posts.create({
        content: content,
        UserId: UserId,
    })
    .then(() => { 
        return res.status(200).json(statusManagement.success(newPost));
    })
    .catch(err => { 
        return res.status(500).json(statusManagement.error(`Une erreur est survenue lors de l'envois du message: ${err}`));
    });
};