const db = require('../models');
const status_management = require('../middleware/status-management');

exports.getAllPosts = (req, res) => {
    db.Posts.findAll({
        include: [{
            model: db.Users,
            attributes: ['id', 'username', 'is_admin']
        }]
    })
    .then((posts) => { return res.status(200).json(status_management.success(posts))})
    .catch((err) => { return res.status(500).json(error_management.error(err.message))})
};

exports.deletePost = (req, res) => {
    db.Posts.findOne({ where:{id:req.params.id}})
    .then(post_founded => { return res.status(200).json({post_founded})
        /*if(req.params.id === post_founded.UserId || post_founded.is_admin == 1){
            db.Posts.destroy({attributes: id, where:{id:req.params.id}})
            .then(() => { return res.status(200).json(status_management.success("Message supprimé !"))})
            .catch(err => { return res.status(500).json(status_management.error(`Impossible de supprimer le message: ${err} `))})
        } else return res.status(401).json(status_management.error("Vous ne pouvez pas supprimer ce message !"));*/
    })
    .catch(err => { return res.status(500).json(status_management.error(`Une erreur est survenue: ${err}`))});
};

exports.addPost = (req, res) => {
        var new_post = db.Posts.create({
        content: req.body.content,
        UserId: req.body.UserId,
    })
    .then((new_post) => { return res.status(200).json(status_management.success(new_post))})
    .catch((err) => { return res.status(500).json(status_management.error(`Une erreur est survenue lors de l'envois du message: ${err}`))});
};