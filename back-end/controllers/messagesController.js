const Messages = require('../models/messages');
const bdd = require('../models/dbConnect');
const { error, success } = require('../middleware/error-management');

exports.getAllMessages = (req, res) => {
    bdd.query(Messages.getAllMessages(), (err, result) => {
        if(err) {
            throw err;
        } else {
            return res.status(201).json(result)
        }
    });
};

exports.deleteMessage = (req, res) => {
    bdd.query(Messages.selectMessageById(), req.params.id, (err, result) => {
        if(err){
            throw err;
        } else {
            if(result[0] != undefined){
                if(req.params.id == result[0].messages_id){
                    bdd.query(Messages.deleteMessage(), req.params.id, (err, result) => {
                        if(err){
                            throw err;
                        } else {
                            return res.status(200).json(success(result));
                        }
                    });
                } else {
                    return res.status(403).json(error('Vous ne pouvez pas supprimer ce message'));
                }
            } else {
                return res.status(404).json(error("Message non reconnu"));
            }
        }
    })
};

exports.addMessage = (req, res) => {
    bdd.query(Messages.addMessage(), [ 
        req.body.messages_text,
        req.body.users_id,
    ],(err, result) => {
        if(err){
            return res.status(500).json(error(err.message));
        } else {
            return res.status(201).json(success("Message envoyé", result));
        }
    });
};