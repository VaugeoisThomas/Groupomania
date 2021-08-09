const db = require('../models');
const password_schema = require("../middleware/password-validator");
const status_management = require("../middleware/status-management");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');

//Creation of user
exports.createUser = (req, res) => {
    if(password_schema.validate(req.body.password)){
        db.Users.findOne({ attributes: ['email'], where: {email: req.body.email}})
        .then(user_founded => {
            if(!user_founded){
                bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
                    var new_user = db.Users.create({
                        email: maskdata.maskEmail2(req.body.email),
                        password: hashed_password,
                        username: req.body.username,
                        is_admin: 0
                    })
                    .then(new_user => { return res.status(201).json(status_management.success(new_user))})
                    .catch(err => { return res.status(500).json(status_management.error(err))})
                })
            }
        }).catch(err => { return res.status(400).json(`Une erreur est survenue, durant l'inscription: ${err}`)});
    } else return res.status(500).json(status_management.error('Votre mot de passe est incorrect.'));
};

//Login
exports.login = (req, res) => {
    let masked_email = (req.body.email ? maskdata.maskEmail2(req.body.email) : undefined);

    db.Users.findOne({ where: {email: masked_email}})
    .then(user_founded => {
        if(bcrypt.compareSync(req.body.password, user_founded.password)){
            return res.status(200).json({
                is_admin: user_founded.is_admin,
                id: user_founded.id,
                token: jwt.sign(
                    { id: user_founded.id, is_admin: user_founded.is_admin },
                    process.env.TOKEN,
                    { expiresIn: process.env.TOKEN_EXPIRES_IN }
                )
            })
        } else return res.status(401).json(status_management.error("Mot de passe incorrect"));
    })
    .catch(err => { return res.status(500).json(status_management.error(`Utilisateur introuvable : ${err}`))})
};

//Selection of all users
exports.selectAllUsers = (req, res) => {
    db.Users.findAll()
    .then(users => { return res.status(201).json(status_management.success(users))})
    .catch(err => { return res.status(500).json(status_management.error(err.message))})
};

//Selection of on user 
exports.selectOneUser = (req, res) => {
    db.Users.findOne( {where:{id: req.params.id}})
    .then((user_founded) => { return res.status(200).json(status_management.success(user_founded))})
    .catch((err) => { return res.status(404).json(status_management.error(`Aucun utilisateur n'a été trouvé : ${err}`))});
}

//Deletion of one user
exports.deleteOneUser = (req, res) => {
    db.Users.findOne({attributes: ['id'], where:{id:req.params.id}})
    .then(user_founded => { 
        if(req.params.id === user_founded.id || user_founded.is_admin == 1){
            db.Users.bulkDelete({attributes: id, where:{id:req.params.id}})
            .then(() => { return res.status(200).json(status_management.success("Compte supprimé !"))})
            .catch(err => { return res.status(500).json(status_management.error(`Impossible de supprimer le compte: ${err} `))})
        } else return res.status(401).json(status_management.error("Vous ne pouvez pas supprimer ce compte !"));
    })
    .catch(err => { return res.status(500).json(status_management.error(`Une erreur est survenue: ${err}`))});
};

//Updating of informations about users 
exports.updateAccount = (req, res) => {
    if(password_schema.validate(req.body.password)) {
        db.Users.findOne({ attributes: ['id', 'username', 'password', 'email', 'is_admin'],  where: {id: req.params.id}})
        .then(user_founded => {
            if(user_founded.email === req.body.email)  return res.status(401).json(status_management.error("Cette adresse est déjà utilisée"));
            bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
                var updated_user = db.Users.update({ 
                        username: req.body.username, 
                        password: hashed_password,  
                        email: maskdata.maskEmail2(req.body.email), 
                        is_admin: req.body.is_admin
                    }, 
                    { 
                        where: { 
                            id: req.params.id 
                        }
                    })
                .then(updated_user => { return res.status(200).json(status_management.success(updated_user))})
                .catch(err => {return res.status(500).json(status_management.error(`Impossible de modifier ce profil: ${err}`))})
            })
        })
        .catch((err) => { return res.status(404).json(status_management.error(`Impossible de trouver cet utilisateur : ${err}`))});
    }
};