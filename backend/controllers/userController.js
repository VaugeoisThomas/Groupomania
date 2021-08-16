const db = require('../models');
const passwordSchema = require("../middleware/passwordValidator");
const statusManagement = require("../middleware/statusManagement");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');

//Creation of user
exports.createUser = (req, res) => {

    //Variables
    const {password, email, username} = req.body;

    //Functions
    if(passwordSchema.validate(password)){
        db.Users.findOne({
            attributes: ['email'], 
            where: {
                email: maskdata.maskEmail2(email)
            }
        })
        .then(userFounded => {
            console.log(userFounded)
            if(userFounded !== null){
                return res.status(500).json(statusManagement.error(`Cet utilisateur existe déjà`));
            } else {
                bcrypt.hash(password, 10, (err, hashed_password) => {
                    let newUser = db.Users.create({ 
                            email: maskdata.maskEmail2(email), 
                            password: hashed_password, 
                            username: username, 
                            isAdmin: 0 
                        })
                    .then(() => { 
                        return res.status(201).json(statusManagement.success(newUser));
                    })
                    .catch((err) => {
                        return res.status(500).json(statusManagement.error(`Impossible de créer l'utilisateur : ${err}`));
                    })
                });
            }
        }).catch(err => { 
            return res.status(400).json(statusManagement.error(`Une erreur est survenue, durant l'inscription: ${err}`));
        });
    } else {
        return res.status(500).json(statusManagement.error('Votre mot de passe est incorrect.'));
    }
};

//Login
exports.login = (req, res) => {

    //Variables
    const {email, password} = req.body;
    let maskedEmail = (email ? maskdata.maskEmail2(email) : undefined);

    //Functions
    db.Users.findOne({ 
        where: {
            email: maskedEmail
        }
    })
    .then(userFounded => {
        if(userFounded === null){
            return res.status(500).json(statusManagement.error("Une erreur est survenue."));
        }else if(bcrypt.compareSync(password, userFounded.password)){
            return res.status(200).json({
                isAdmin: userFounded.isAdmin,
                id: userFounded.id,
                token: jwt.sign(
                    { 
                        id: userFounded.id, 
                        isAdmin: userFounded.isAdmin 
                    },
                    process.env.TOKEN,
                    { 
                        expiresIn: process.env.TOKEN_EXPIRES_IN 
                    }
                )
            })
        } else {
            return res.status(401).json(statusManagement.error("Mot de passe incorrect"));
        }
    })
    .catch(err => { 
        return res.status(500).json(statusManagement.error(`Utilisateur introuvable : ${err}`));
    })
};

//Selection of all users
exports.selectAllUsers = (req, res) => {

    //Functions
    db.Users.findAll()
    .then(usersFounded => { 
        if(usersFounded === null){
            return res.status(500).json(statusManagement.error('Une erreur interne est survenue !'))   
        }
        else {
            return res.status(201).json(statusManagement.success(usersFounded));
        }
    })
    .catch(err => { 
        return res.status(500).json(statusManagement.error(err.message));
    })
};

//Selection of on user 
exports.selectOneUser = (req, res) => {

    //Variables
    const {id} = req.params;

    //Functions
    db.Users.findOne({
        where:{
            id:id
        }
    })
    .then((userFounded) => { 
        return res.status(200).json(statusManagement.success(userFounded));
    })
    .catch((err) => { 
        return res.status(404).json(statusManagement.error(`Aucun utilisateur n'a été trouvé : ${err}`));
    });
}

//Deletion of one user
exports.deleteOneUser = (req, res) => {

    //Variables
    const {id} = req.params;

    //Functions
    db.Users.findOne({ 
        where: {
            id: id
        }
    })
    .then(userFounded => { 
        console.log(`l'id de l'utilisateur sur le site est ${id}, et celui de la base de donnée est ${userFounded.id}`)
        if(userFounded === null){
            return res.status(500).json(statusManagement.error(`Une erreur interne est survenue !`))
        }
        
        if(id == userFounded.id || userFounded.isAdmin == 1){
            db.Users.destroy({
                attributes: id, 
                where:{
                    id:id
                }
            })
            .then(() => { 
                return res.status(200).json(statusManagement.success("Compte supprimé !"));
            })
            .catch(err => { 
                return res.status(500).json(statusManagement.error(`Impossible de supprimer le compte: ${err} `));
            })
        } else {
            return res.status(401).json(statusManagement.error("Vous ne pouvez pas supprimer ce compte !"));
        }
    })
    .catch(err => { 
        return res.status(500).json(statusManagement.error(`Une erreur est survenue: ${err}`));
    });
};

//Updating of informations about users 
exports.updateAccount = (req, res) => {

    //Variable
    const {password, username, isAdmin, email} = req.body;
    const {id} = req.params;

    //Functions
    if(passwordSchema.validate(password)) {
        db.Users.findOne({
            attributes: ['id', 'username', 'password', 'email', 'isAdmin'],
            where: {
                id:id
            }
        })
        .then(userFounded => {
            if(userFounded.email === email){
                return res.status(401).json(statusManagement.error("Cette adresse est déjà utilisée"));
            }  
            bcrypt.hash(password, 10, (err, hashed_password) => {
                let updatedUser = db.Users.update({ 
                    username: username, 
                    password: hashed_password,  
                    email: maskdata.maskEmail2(email), 
                    isAdmin: isAdmin 
                    }, 
                    { 
                        where: { 
                            id: id  
                        }
                    })
                .then(updatedUser => { 
                    return res.status(200).json(statusManagement.success(updatedUser));
                })
                .catch(err => {
                    return res.status(500).json(statusManagement.error(`Impossible de modifier ce profil: ${err}`));
                });
            })
        })
        .catch((err) => { 
            return res.status(404).json(statusManagement.error(`Impossible de trouver cet utilisateur : ${err}`));
        });
    }
};