const User = require('../models/User');
const Bdd = require('../models/dbConnect');
const Password_schema = require("../middleware/password-validator");
const Error_management = require("../middleware/error-management");
const Jwt = require('jsonwebtoken');
const Bcrypt = require('Bcrypt');
const Maskdata = require('Maskdata');

exports.createUser = (req, res) => {
    if (Password_schema.validate(req.body.password)) {
        if (req.body.email) {
            const masked_email = Maskdata.maskEmail2(req.body.email);
            Bdd.query(User.selectUserByEmail(), req.body.email, (err, result) => {
                if (err) {
                    return res.status(400).json(Error_management.error(error.message))
                } else if (result[0] != undefined) {
                    return res.status(401).json(Error_management.error("Cet email est déjà utilisé par un autre membre !"));
                } else {
                    Bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const Hashed_password = hash;
                            Bdd.query(User.creationUser(),
                                [
                                    masked_email,
                                    Hashed_password,
                                    req.body.name,
                                ], (err) => {
                                    if (err) {
                                        return res.status(401).json(Error_management.error(err.message));
                                    } else {
                                        Bdd.query(User.selectUserByEmail(), masked_email, (err, result) => {
                                            if (err) {
                                                return res.status(500).json(Error_management.error(err.message))
                                            } else {
                                                return res.status(201).json({
                                                    UserId: result[0].id,
                                                    token: Jwt.sign(
                                                        { UserId: result[0].id },
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
                        .catch(error => res.status(500).json(Error_management.error(error)))
                }
            })
        } else {
            return res.status(422).json(Error_management.error("Veuillez saisir votre adresse Email !"));
        }
    } else {
        return res.status(404).json(Error_management.error("Votre mot de passe n'est pas valide !"))
    }
};

exports.login = (req, res) => {
    if (req.body.email) {
        const masked_email = Maskdata.maskEmail2(req.body.email);
        Bdd.query(User.selectUserByEmail(), masked_email, (err, result) => {
            if (err) {
                return res.status(401).json(Error_management.error(err.message));
            } else {
                if (masked_email === result[0].email) {
                    if (!req.body.password || !Bcrypt.compareSync(req.body.password, result[0].password)) {
                        return res.status(401).json(Error_management.error("Mot de passe incorrect"));
                    } else {
                        return res.status(200).json({
                            is_admin: result[0].is_admin,
                            UserId: result[0].id,
                            token: Jwt.sign(
                                { UserId: result[0].id },
                                process.env.TOKEN,
                                { expiresIn: process.env.TOKEN_EXPIRES_IN }
                            ),
                        });
                    }
                } else {
                    return res.status(401).json(Error_management.error("Votre email est incorrect"));
                }
            }
        });
    } else {
        return res.status(401).json(Error_management.error("Saississez votre adresse E-mail"));
    }
};

exports.selectAllUsers = (req, res) => {
    Bdd.query(User.selectAllUsers(), (err, result) => {
        if (err) {
            return res.status(500).json(Error_management.error(err.message))
        } else {
            return res.status(201).json(Error_management.success(result))
        }
    });
};

exports.selectOneUser = (req, res) => {
    Bdd.query(User.selectUserById(), req.params.id, (err, result) => {
        if (err) {
            return res.status(404).json(Error_management.error(err.message));
        } else {
            if (result[0] != undefined) {
                return res.status(200).json(Error_management.success(result[0]));
            } else {
                return res.status(404).json(Error_management.error("Utilisateur introuvable"));
            }
        }
    })
};

exports.deleteOneUser = (req, res) => {
    Bdd.query(User.selectUserById(), req.params.id, (err, result) => {
        if (err) {
            return res.status(404).json(Error_management.error(err.message));
        } else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    Bdd.query(User.deleteUser(), req.params.id, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            return res.status(200).json(Error_management.success(result));
                        }
                    });
                } else {
                    return res.status(403).json(Error_management.error("Vous ne pouvez pas supprimer cet utilisateur"));
                }
            } else {
                return res.status(404).json(Error_management.error("Utilisateur non reconnu"));
            }
        }
    })
};

exports.updateAccount = (req, res) => {
    if (Password_schema.validate(req.body.password)) {
        Bdd.query(User.selectUserById(), req.params.id, (err, result) => {
            if (err) {
                res.status(404).json(Error_management.error(err.message))
            } else {
                if (result[0] != undefined) {
                    if (req.body.email) {
                        const masked_email = Maskdata.maskEmail2(req.body.email);
                        Bdd.query(User.selectUserByEmail(), req.body.email, (err, result) => {
                            if (err) {
                                return res.status(400).json(Error_management.error(error.message))
                            } else if (result[0] != undefined) {
                                return res.status(401).json(Error_management.error("Cet email est déjà utilisé par un autre membre !"));
                            } else {
                                Bcrypt.hash(req.body.password, 10)
                                    .then(hash => {
                                        const Hashed_password = hash;
                                        Bdd.query(User.updateData(),
                                            [
                                                req.body.name,
                                                Hashed_password,
                                                masked_email,
                                                req.params.id,
                                            ], (err) => {
                                                if (err) {
                                                    return res.status(401).json(Error_management.error(err.message));
                                                } else {
                                                    Bdd.query(User.selectUserByEmail(), masked_email, (err, result) => {
                                                        if (err) {
                                                            return res.status(500).json(Error_management.error(err.message))
                                                        } else {
                                                            return res.status(201).json({
                                                                UserId: result[0].id,
                                                                token: Jwt.sign(
                                                                    { UserId: result[0].id },
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
                                    .catch(error => res.status(500).json(Error_management.error(error)))
                            }
                        })
                    } else {
                        return res.status(404).json(Error_management.error("Veuillez saisir votre adresse Email !"));
                    }
                }
            }
        })
    }
}