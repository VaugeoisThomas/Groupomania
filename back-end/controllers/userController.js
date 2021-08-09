/* const user = require('../models/User');
const bdd = require('../config/database'); */
const password_schema = require("../middleware/password-validator");
const error_management = require("../middleware/error-management");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');

exports.createUser = (req, res) => {
    if (password_schema.validate(req.body.password)) {
        if (req.body.email) {
            const masked_email = maskdata.maskEmail2(req.body.email);
            bdd.query(user.selectUserByEmail(), req.body.email, (err, result) => {
                if (err) return res.status(400).json(error_management.error(error.message));
                else if (result[0] != undefined) return res.status(401).json(error_management.error("Cet email est déjà utilisé par un autre membre !"));
                else {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const Hashed_password = hash;
                            bdd.query(user.creationUser(), [masked_email, Hashed_password, req.body.name], (err) => {
                                if (err) return res.status(401).json(error_management.error(err.message));
                                else {
                                    bdd.query(user.selectUserByEmail(), masked_email, (err, result) => {
                                        if (err) return res.status(500).json(error_management.error(err.message));
                                        else {
                                            return res.status(201).json({
                                                id: result[0].id,
                                                token: jwt.sign(
                                                    { id: result[0].id },
                                                    process.env.TOKEN,
                                                    { expiresIn: process.env.TOKEN_EXPIRES_IN }
                                                ),
                                                is_admin: result[0].is_admin
                                            });
                                        }
                                    })

                                }
                            });
                        })
                        .catch(error => res.status(500).json(error_management.error(error)))
                }
            })
        } else return res.status(422).json(error_management.error("Veuillez saisir votre adresse Email !"));

    } else return res.status(404).json(error_management.error("Votre mot de passe n'est pas valide !"));
};

exports.login = (req, res) => {
    if (req.body.email) {
        const masked_email = maskdata.maskEmail2(req.body.email);
        bdd.query(user.selectUserByEmail(), masked_email, (err, result) => {
            if (err) return res.status(401).json(error_management.error(err.message));
            else {
                if (masked_email === result[0].email) {
                    if (!req.body.password || !bcrypt.compareSync(req.body.password, result[0].password))
                        return res.status(401).json(error_management.error("Mot de passe incorrect"));
                    else {
                        return res.status(200).json({
                            is_admin: result[0].is_admin,
                            id: result[0].id,
                            token: jwt.sign(
                                { id: result[0].id },
                                process.env.TOKEN,
                                { expiresIn: process.env.TOKEN_EXPIRES_IN }
                            ),
                        });
                    }
                } else return res.status(401).json(error_management.error("Votre email est incorrect"));
            }
        });
    } else return res.status(401).json(error_management.error("Saississez votre adresse E-mail"));
};

exports.selectAllUsers = (req, res) => {
    bdd.query(user.selectAllUsers(), (err, result) => {
        return (err ? res.status(500).json(error_management.error(err.message)) : res.status(201).json(error_management.success(result)));
    });
};

exports.selectOneUser = (req, res) => {
    bdd.query(user.selectUserById(), req.params.id, (err, result) => {
        if (err) return res.status(404).json(error_management.error(err.message));
        else {
            return (result[0] != undefined ? res.status(200).json(error_management.success(result[0])) : res.status(404).json(error_management.error("Utilisateur introuvable")));
        }
    })
};

exports.deleteOneUser = (req, res) => {
    bdd.query(user.selectUserById(), req.params.id, (err, result) => {
        if (err) return res.status(404).json(error_management.error(err.message));
        else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    bdd.query(user.deleteUser(), req.params.id, (err, result) => {
                        return (err ? res.status(404).json(error_management.error(err.message)) : res.status(200).json(error_management.success(result)));
                    });
                } else return res.status(403).json(error_management.error("Vous ne pouvez pas supprimer cet utilisateur"));
            } else return res.status(404).json(error_management.error("Utilisateur non reconnu"));
        }
    })
};

exports.updateAccount = (req, res) => {
    if (password_schema.validate(req.body.password)) {
        bdd.query(user.selectUserById(), req.params.id, (err, result) => {
            if (err) res.status(404).json(error_management.error(err.message))
            else {
                if (result[0] != undefined) {
                    if (req.body.email) {
                        const masked_email = maskdata.maskEmail2(req.body.email);
                        bdd.query(user.selectUserByEmail(), req.body.email, (err, result) => {
                            if (err) return res.status(400).json(error_management.error(error.message));
                            else if (result[0] != undefined) return res.status(401).json(error_management.error("Cet email est déjà utilisé par un autre membre !"));
                            else {
                                bcrypt.hash(req.body.password, 10)
                                    .then(hash => {
                                        const Hashed_password = hash;
                                        bdd.query(user.updateData(), [req.body.name, Hashed_password, masked_email, req.params.id], (err) => {
                                            if (err) return res.status(401).json(error_management.error(err.message));
                                            else {
                                                bdd.query(user.selectUserByEmail(), masked_email, (err, result) => {
                                                    if (err) return res.status(500).json(error_management.error(err.message))
                                                    else {
                                                        return res.status(201).json({
                                                            id: result[0].id,
                                                            token: jwt.sign(
                                                                { id: result[0].id },
                                                                process.env.TOKEN,
                                                                { expiresIn: process.env.TOKEN_EXPIRES_IN }
                                                            ),
                                                            isAdmin: result[0].is_admin
                                                        });
                                                    }
                                                })

                                            }
                                        });
                                    })
                                    .catch(error => res.status(500).json(error_management.error(error)));
                            }
                        })
                    } else return res.status(404).json(error_management.error("Veuillez saisir votre adresse Email !"));
                }
            }
        })
    }
}