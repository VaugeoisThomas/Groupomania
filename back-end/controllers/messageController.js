const message = require('../models/message');
const bdd = require('../models/dbConnect');
const error_management = require('../middleware/error-management');

exports.getAllMessages = (req, res) => {
    bdd.query(message.getAllMessages(), (err, result) => {
        return (err ? res.status(500).json(error_management.error(err.message)) : res.status(201).json(error_management.success(result)));
    });
};

exports.deleteMessage = (req, res) => {
    bdd.query(message.selectMessageById(), req.params.id, (err, result) => {
        if (err) return res.status(500).json(error_management.error(err.message));
        else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    bdd.query(message.deleteMessage(), req.params.id, (err, result) => {
                        return (err ? res.status(403).json(error_management.error(err.message)) : res.status(200).json(error_management.success(result)));
                    });
                } else return res.status(403).json(error_management.error('Vous ne pouvez pas supprimer ce message !'));
            } else return res.status(404).json(error_management.error("Message non reconnu"));
        }
    })
};

exports.addMessage = (req, res) => {
    bdd.query(message.addMessage(), [req.body.content, req.body.user_id], (err, result) => {
        return (err ? res.status(500).json(error_management.error(err.message)) : res.status(201).json(error_management.success(result)));
    });
};
