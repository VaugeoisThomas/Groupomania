const Users = require('../models/users');
const bdd = require('../models/dbConnect');
const password_schema = require("../middleware/password-validator");
const { error, success } = require("../middleware/error-management");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {
    if (password_schema.validate(req.body.users_password)) {
        if (req.body.users_email) {
            bdd.query(Users.selectUsersByEmail(), [req.body.users_email], (err, result) =>{
                if(err){
                    return res.status(400).json(error(error.message))
                } else if (result[0] != undefined) {
                    return res.status(401).json(error("Cet email est déjà utilisé par un autre membre !"));
                } else {
                    bcrypt.hash(req.body.users_password, 10)
                    .then( hash => {
                        let passwordHashed = hash;
                        bdd.query(Users.creationUser(), [req.body.users_email, passwordHashed], (err) => {
                            if(err){
                                return res.status(401).json(error(err.message));
                            } else {
                                bdd.query(Users.selectUsersByEmail(), [req.body.users_email], (err, result) =>  {
                                    if(err) {
                                        return res.status(500).json(error(err.message))
                                    } else {
                                        return res.status(201).json({
                                            userId: result[0].users_id,
                                            token: jwt.sign(
                                                { userId: result[0].users_id},
                                                process.env.TOKEN,
                                                { expiresIn: process.env.TOKEN_EXPIRES_IN}
                                            )
                                        });
                                    }
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
        bdd.query(Users.selectUsersByEmail(), [req.body.users_email], (error, result) => {
            if (error) {
                throw error;
            } else {
                if (!result[0] || !bcrypt.compare(req.body.users_password, result[0].users_password)) {
                    res.status(401).json({
                        message: "Mot de passe incorrect",
                    })
                } else {
                    res.status(200).json({
                        userId: result[0].users_id,
                        token: jwt.sign(
                            { userId: result[0].users_id },
                            process.env.TOKEN,
                            { expiresIn: process.env.TOKEN_EXPIRES_IN}
                        )
                    });
                }
            }
        });
    } else {
        res.status(404).json({
            message: "Saississez votre adresse E-mail"
        });
    }
};

exports.selectAllUsers = (req, res) => {
    bdd.query(Users.selectAllUsers(), (error, result) => {
        if(error){
            throw error;
        } else {
            res.status(201).json(result)
        }
    });
};

exports.createUserProfil = (req, res) => {
    if (req.body.users_name) {
        bdd.query(Users.selectUsersByUserName(), [req.body.users_name], (err, result) => {
            if(err){
                res.status(400).json(error(error.message));
            } else if (result[0] != undefined) {
                return res.status(401).json(error("Ce pseudo est déjà utilisé par un autre membre !"));
            } else {
                bdd.query(Users.createUserProfil(), [req.body.users_name, req.body.users_age, req.body.users_biography, req.params.id], (err) => {
                    if(err){
                        res.status(401).json(error(err.message))
                    } else {
                        res.status(201).json({ message: "Profil enregistré !" });
                    }
                });
            }
        });
    }
};

exports.selectOneUser = (req, res) => {
    bdd.query(Users.selectUsersById(), [req.params.id], (error, result) => {
        if(error) {
            throw error;
        } else {
            if(result[0] != undefined){
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({
                    message: "Utilisateur introuvable",
                })
            }
        }
    })
};

exports.deleteOneUser = (req, res) => {
    console.log("1");
    /*bdd.query(Users.selectUsersById(), [req.params.id], (err, result) => {
        if(err) {
            throw err;
        } else {
            if(result[0] != undefined){
                if(req.params.id === result[0].users_id) {
                    bdd.query(Users.deleteUsers(), [req.params.id], (err, result) => {
                        if(err) {
                            throw err;
                        } else {
                            res.status(200).json({
                                message: "Membre supprimé !",
                            });
                        }
                    });
                } else {
                    res.status(403).json({
                        message: "Vous ne pouvez pas supprimé cet utilisateur",
                    });
                }
            } else {
                res.status(404).json({
                    message: "Utilisateur non reconnu",
                });
            }
        }
    })*/
};

exports.updateUserName = () => {

};

exports.updateUsersEmail = () => {

}

exports.updateUsersAge = () => {

}

exports.updateUsersBiography = () => {

}
