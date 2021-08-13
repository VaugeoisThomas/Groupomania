const db = require('../models');
const password_schema = require("../middleware/password-validator");
const status_management = require("../middleware/status-management");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');

//Creation of user
exports.createUser = (req, res) => {

    //Variables
    const {password, email, username} = req.body;

    //Functions
    if(password_schema.validate(password)){
         db.Users.findOne({ attributes: ['email'], where: {email: email}})
        .then(user_founded => {
            if(user_founded !== null){
                /*bcrypt.hash(password, 10, (err, hashed_password) => {
                    let new_user = db.Users.create({ email: maskdata.maskEmail2(email), password: hashed_password, username: username, is_admin: 0 })
                    .then((new_user) => { return res.status(201).json(status_management.success(new_user))})
                    .catch((err) => { return res.status(500).json(status_management.error(err))})
                })*/
            } else return res.status(500).json(status_management.error(`Cet utilisateur existe déjà: ${user_founded}`)) 
        }).catch(err => { return res.status(400).json(status_management.error(`Une erreur est survenue, durant l'inscription: ${err}`))});
    } else return res.status(500).json(status_management.error('Votre mot de passe est incorrect.'));
};

//Login
exports.login = (req, res) => {

    //Variables
    const {email, password} = req.body;
    let masked_email = (email ? maskdata.maskEmail2(email) : undefined);

    //Functions
    db.Users.findOne({ where: {email: masked_email}})
    .then(user_founded => {
        if(bcrypt.compareSync(password, user_founded.password)){
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

    //Functions
    db.Users.findAll()
    .then(users => { return res.status(201).json(status_management.success(users))})
    .catch(err => { return res.status(500).json(status_management.error(err.message))})
};

//Selection of on user 
exports.selectOneUser = (req, res) => {

    //Variables
    const {id} = req.params;

    //Functions
    db.Users.findOne( {where:{id:id}})
    .then((user_founded) => { return res.status(200).json(status_management.success(user_founded))})
    .catch((err) => { return res.status(404).json(status_management.error(`Aucun utilisateur n'a été trouvé : ${err}`))});
}

//Deletion of one user
exports.deleteOneUser = (req, res) => {

    //Variables
    const {id} = req.params;

    //Functions
    db.Users.findOne({attributes: ['id'], where:{id:id}})
    .then(user_founded => { 
        if(id === user_founded.id || user_founded.is_admin == 1){
            db.Users.destroy({attributes: id, where:{id:id}})
            .then(() => { return res.status(200).json(status_management.success("Compte supprimé !"))})
            .catch(err => { return res.status(500).json(status_management.error(`Impossible de supprimer le compte: ${err} `))})
        } else return res.status(401).json(status_management.error("Vous ne pouvez pas supprimer ce compte !"));
    })
    .catch(err => { return res.status(500).json(status_management.error(`Une erreur est survenue: ${err}`))});
};

//Updating of informations about users 
exports.updateAccount = (req, res) => {

    //Variable
    const {password, username, is_admin, email} = req.body;
    const {id} = req.params;

    //Functions
    if(password_schema.validate(password)) {
        db.Users.findOne({ attributes: ['id', 'username', 'password', 'email', 'is_admin'],  where: {id:id}})
        .then(user_founded => {
            if(user_founded.email === email)  return res.status(401).json(status_management.error("Cette adresse est déjà utilisée"));
            bcrypt.hash(password, 10, (err, hashed_password) => {
                let updated_user = db.Users.update({ username: username, password: hashed_password,  email: maskdata.maskEmail2(email), is_admin: is_admin }, { where: { id: id  }})
                .then(updated_user => { return res.status(200).json(status_management.success(updated_user))})
                .catch(err => {return res.status(500).json(status_management.error(`Impossible de modifier ce profil: ${err}`))})
            })
        })
        .catch((err) => { return res.status(404).json(status_management.error(`Impossible de trouver cet utilisateur : ${err}`))});
    }
};