const Users = require('../models/users');
const bdd = require('../models/dbConnect');
const password_schema = require("../middleware/password-validator");
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');


exports.createUser = (req, res, next) => {
    if(password_schema.validate(req.body.password)){
        if(req.body.email){
            bdd.query(Users.selectUsersByEmail(), req.body.email, function(error, results){
                if(error) res.status(400).json(error.message);
                else{
                    if(results[0] != undefined) res.status(401).json({message: "Cet email est déjà pris"});
                    else{
                        let hash = bcrypt.hash(req.body.password, 10);
                        bdd.query(Users.creationUser(), [req.body.email, hash], function(error, results){
                            if(error) res.status(400).json(error.message);
                            else{
                                if(results[0] != undefined){
                                    res.status(201).json({
                                        is_admin: results[0].is_admin,
                                        usersID: results[0].users_id,
                                        token: token.sign({usersID: results[0].users_id}, process.env.TOKEN, {expiresIn: process.env.TOKEN_EXPIRES_IN})
                                    });
                                } else res.status(404).json({message: "Utilisateur inconnu"});
                            }
                        });
                    }
                }
            });
        } else res.status(404).json({message: "Renseignez votre email"});
    } else res.status(401).json({message: "Votre mot de passe est invalide"});
};