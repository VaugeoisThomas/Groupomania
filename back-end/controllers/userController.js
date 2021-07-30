const USER = require('../models/user');
const BDD = require('../models/dbConnect');
const PASSWORD_SCHEMA = require("../middleware/password-validator");
const ERROR_MANAGEMENT = require("../middleware/error-management");
const JWT = require('jsonwebtoken');
const BCRYPT = require('bcrypt');
const MASKDATA = require('maskdata');

exports.createUser = (req, res) => {
    if (PASSWORD_SCHEMA.validate(req.body.password)) {
        if (req.body.email) {
            const MASKED_EMAIL = MASKDATA.maskEmail2(req.body.email);
            BDD.query(USER.selectUserByEmail(), req.body.email, (err, result) => {
                if (err) {
                    return res.status(400).json(ERROR_MANAGEMENT.error(error.message))
                } else if (result[0] != undefined) {
                    return res.status(401).json(ERROR_MANAGEMENT.error("Cet email est déjà utilisé par un autre membre !"));
                } else {
                    BCRYPT.hash(req.body.password, 10)
                        .then(hash => {
                            const HASHED_PASSWORD = hash;
                            BDD.query(USER.creationUser(),
                                [
                                    MASKED_EMAIL,
                                    HASHED_PASSWORD,
                                    req.body.name,
                                ], (err) => {
                                    if (err) {
                                        return res.status(401).json(ERROR_MANAGEMENT.error(err.message));
                                    } else {
                                        BDD.query(USER.selectUserByEmail(), MASKED_EMAIL, (err, result) => {
                                            if (err) {
                                                return res.status(500).json(ERROR_MANAGEMENT.error(err.message))
                                            } else {
                                                return res.status(201).json({
                                                    userId: result[0].id,
                                                    token: JWT.sign(
                                                        { userId: result[0].id },
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
                        .catch(error => res.status(500).json(ERROR_MANAGEMENT.error(error)))
                }
            })
        } else {
            return res.status(422).json(ERROR_MANAGEMENT.error("Veuillez saisir votre adresse Email !"));
        }
    } else {
        return res.status(404).json(ERROR_MANAGEMENT.error("Votre mot de passe n'est pas valide !"))
    }
};

exports.login = (req, res) => {
    if (req.body.email) {
        const MASKED_EMAIL = MASKDATA.maskEmail2(req.body.email);
        BDD.query(USER.selectUserByEmail(), MASKED_EMAIL, (err, result) => {
            if (err) {
                return res.status(401).json(ERROR_MANAGEMENT.error(err.message));
            } else {
                if (MASKED_EMAIL === result[0].email) {
                    if (!req.body.password || !BCRYPT.compareSync(req.body.password, result[0].password)) {
                        return res.status(401).json(ERROR_MANAGEMENT.error("Mot de passe incorrect"));
                    } else {
                        return res.status(200).json({
                            is_admin: result[0].is_admin,
                            userId: result[0].id,
                            token: JWT.sign(
                                { userId: result[0].id },
                                process.env.TOKEN,
                                { expiresIn: process.env.TOKEN_EXPIRES_IN }
                            ),
                        });
                    }
                } else {
                    return res.status(401).json(ERROR_MANAGEMENT.error("Votre email est incorrect"));
                }
            }
        });
    } else {
        return res.status(401).json(ERROR_MANAGEMENT.error("Saississez votre adresse E-mail"));
    }
};

exports.selectAllUsers = (req, res) => {
    BDD.query(USER.selectAllUsers(), (err, result) => {
        if (err) {
            return res.status(500).json(ERROR_MANAGEMENT.error(err.message))
        } else {
            return res.status(201).json(ERROR_MANAGEMENT.success(result))
        }
    });
};

exports.selectOneUser = (req, res) => {
    BDD.query(USER.selectUserById(), req.params.id, (err, result) => {
        if (err) {
            return res.status(404).json(ERROR_MANAGEMENT.error(err.message));
        } else {
            if (result[0] != undefined) {
                return res.status(200).json(ERROR_MANAGEMENT.success(result[0]));
            } else {
                return res.status(404).json(ERROR_MANAGEMENT.error("Utilisateur introuvable"));
            }
        }
    })
};

exports.deleteOneUser = (req, res) => {
    BDD.query(USER.selectUserById(), req.params.id, (err, result) => {
        if (err) {
            return res.status(404).json(ERROR_MANAGEMENT.error(err.message));
        } else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    BDD.query(USER.deleteUser(), req.params.id, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            return res.status(200).json(ERROR_MANAGEMENT.success(result));
                        }
                    });
                } else {
                    return res.status(403).json(ERROR_MANAGEMENT.error("Vous ne pouvez pas supprimer cet utilisateur"));
                }
            } else {
                return res.status(404).json(ERROR_MANAGEMENT.error("Utilisateur non reconnu"));
            }
        }
    })
};

exports.updateAccount = (req, res) => {
    if (PASSWORD_SCHEMA.validate(req.body.password)) {
        BDD.query(USER.selectUserById(), req.params.id, (err, result) => {
            if (err) {
                res.status(404).json(ERROR_MANAGEMENT.error(err.message))
            } else {
                if (result[0] != undefined) {
                    if (req.body.email) {
                        const MASKED_EMAIL = MASKDATA.maskEmail2(req.body.email);
                        BDD.query(USER.selectUserByEmail(), req.body.email, (err, result) => {
                            if (err) {
                                return res.status(400).json(ERROR_MANAGEMENT.error(error.message))
                            } else if (result[0] != undefined) {
                                return res.status(401).json(ERROR_MANAGEMENT.error("Cet email est déjà utilisé par un autre membre !"));
                            } else {
                                BCRYPT.hash(req.body.password, 10)
                                    .then(hash => {
                                        const HASHED_PASSWORD = hash;
                                        BDD.query(USER.updateData(),
                                            [
                                                req.body.name,
                                                HASHED_PASSWORD,
                                                MASKED_EMAIL,
                                                req.params.id,
                                            ], (err) => {
                                                if (err) {
                                                    return res.status(401).json(ERROR_MANAGEMENT.error(err.message));
                                                } else {
                                                    BDD.query(USER.selectUserByEmail(), MASKED_EMAIL, (err, result) => {
                                                        if (err) {
                                                            return res.status(500).json(ERROR_MANAGEMENT.error(err.message))
                                                        } else {
                                                            return res.status(201).json({
                                                                userId: result[0].id,
                                                                token: JWT.sign(
                                                                    { userId: result[0].id },
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
                                    .catch(error => res.status(500).json(ERROR_MANAGEMENT.error(error)))
                            }
                        })
                    } else {
                        return res.status(404).json(ERROR_MANAGEMENT.error("Veuillez saisir votre adresse Email !"));
                    }
                }
            }
        })
    }
}