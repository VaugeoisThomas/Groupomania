const Message = require('../models/message');
const Bdd = require('../models/dbConnect');
const Error_management = require('../middleware/error-management');

exports.getAllMessages = (req, res) => {
    Bdd.query(Message.getAllMessages(), (err, result) => {
        return (err ? res.status(500).json(Error_management.error(err.message)) : res.status(201).json(Error_management.success(result)));
    });
};

exports.deleteMessage = (req, res) => {
    Bdd.query(Message.selectMessageById(), req.params.id, (err, result) => {
        if (err) return res.status(500).json(Error_management.error(err.message));
        else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    Bdd.query(Message.deleteMessage(), req.params.id, (err, result) => {
                        return (err ? res.status(403).json(Error_management.error(err.message)) : res.status(200).json(Error_management.success(result)));
                    });
                } else return res.status(403).json(Error_management.error('Vous ne pouvez pas supprimer ce message !'));
            } else return res.status(404).json(Error_management.error("Message non reconnu"));
        }
    })
};

exports.addMessage = (req, res) => {
    Bdd.query(Message.addMessage(), [req.body.content, req.body.user_id], (err, result) => {
        return (err ? res.status(500).json(Error_management.error(err.message)) : res.status(201).json(Error_management.success(result)));
    });
};
