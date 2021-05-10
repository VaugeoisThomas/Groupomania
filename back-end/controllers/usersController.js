const Users = require('../models/users');
const bdd = require('../models/dbConnect');
const password_schema = require("../middleware/password-validator");
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');


exports.createUser = (req, res, next) => {
    console.log('coucou')
    console.log(req)
    if(password_schema.validate(req.body.password)){
        console.log('Coucou 2')
        if(req.body.email){
            console.log('coucou 3')
            bdd.query(Users.selectUsersByEmail(), req.body.email, function(error, result){
                if(result[0] != undefined){
                    res.status(401).json({
                        message: "Cet email est déjà utilisé par un autre membre !",
                    });
                }else{
                    let passwordHashed = bcrypt.hash(req.body.password, 10);
                    bdd.query(Users.creationUser(), [req.body.email, passwordHashed], function(error, result){
                        if(result[0] != undefined){
                            res.status(201).json({
                                usersID: result[0].users_id,
                                token: token.sign(
                                    {usersID: result[0].users_id}, 
                                    process.env.TOKEN, 
                                    {expiresIn: process.env.TOKEN_EXPIRES_IN}
                                    )
                            });
                        }else{
                            res.status(401).json({
                                message: error,
                            })
                        }
                    });
                    res.status(404).json({
                        message: "Pas trouvé !!!",
                    })
                }
            })
        }
    }else {
        console.log('Il y a u problème')
    }
};

exports.login = (req, res, next) => {
    if(req.body.users_email){
        bdd.query(Users.selectUsersByEmail(), req.body.users_email, function(error, result){
            if(error){
                res.status(404).json(error("Utilisateur non trouvé"));
            }else{
                if(!result[0] || req.body.users_password !== result[0].users_password){
                    res.status(401).json({
                        message: "Mot de passe incorrect", 
                    })
                }else{
                    res.status(200).json({
                        usersID: result[0].users_id,
                        token: token.sign({usersID: result[0].users_id}, process.env.TOKEN, {expiresIn: process.env.TOKEN_EXPIRES_IN})
                    });
                    console.log("Well connected !!")
                }
            }
        });   
    }else{
        res.status(404).json({
            message: "Saississez votre adresse E-mail"
        });
    }
};

exports.selectAllUsers = (req, res, next) => {
    bdd.query(Users.selectAllUsers(), function(error, result){
        if(err){
            res.status(400).json({
                message: error,
            });
        }else{
            res.status(200).json({
                message: result
            });
        }
    });
};

exports.selectOneUser = (req, res, next) => {
    
};

exports.deleteOneUser = (req, res, next) => {
    
};

exports.updateUserName = (req, res, next) => {
    
};

exports.updateUsersEmail = (req, res, next) => {
    
}

exports.updateUsersAge = (req, res, next) => {
    
}

exports.updateUsersBiography = (req, res, next) => {
    
}
