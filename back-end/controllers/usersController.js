const Users = require('../models/users');
const bdd = require('../models/dbConnect');
const password_schema = require("../middleware/password-validator");
const bcrypt = require('bcrypt');


exports.createUser = (req, res) => {
    if (password_schema.validate(req.body.users_password)) {
        if (req.body.users_email) {
            bdd.query(Users.selectUsersByEmail(), req.body.users_email, function(error, results) {
                if(error){
                    throw error;
                }else if (results[0] != undefined) {
                    res.status(401).json({
                        message: "Cet email est déjà utilisé par un autre membre !",
                    });
                } else {
                    bcrypt.hash(req.body.users_password, 10)
                    .then( hash => {
                        let passwordHashed = hash;
                        bdd.query(Users.creationUser(), [req.body.users_email, passwordHashed], function(error) {
                            if(error){
                                throw error;
                            } else {
                                res.status(201).json({
                                    message: "Inscription réussie !"
                                })
                            }
                        });
                    })
                    .catch(error => res.status(500).json({ error }))
                }
            })
        } else {
            res.status(404).json({
                message: "Veuillez saisir votre adresse Email !"
            })
        }
    } else {
        res.status(404).json({
            message: "Votre mot de passe n'est pas valide !",
        })
    }
};

exports.login = (req, res) => {
    if (req.body.users_email) {
        bdd.query(Users.selectUsersByEmail(), req.body.users_email, function (error, result) {
            if (error) {
                throw error;
            } else {
                if (!result[0] || req.body.users_password !== result[0].users_password) {
                    res.status(401).json({
                        message: "Mot de passe incorrect",
                    })
                } else {
                    res.status(200).json({
                        message: 'Vous êtes bien connecté !'
                    });
                }
            }
        });
        bdd.end();
    } else {
        res.status(404).json({
            message: "Saississez votre adresse E-mail"
        });
    }
};

exports.selectAllUsers = (req, res) => {
    bdd.query(Users.selectAllUsers(), function (error, result) {
        if(error){
            throw error;
        } else {
            res.status(201).json(result)
        }
    });
};

exports.selectOneUser = () => {

};

exports.deleteOneUser = () => {

};

exports.updateUserName = () => {

};

exports.updateUsersEmail = () => {

}

exports.updateUsersAge = () => {

}

exports.updateUsersBiography = () => {

}
