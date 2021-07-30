const MESSAGE = require('../models/message');
const BDD = require('../models/dbConnect');
const ERROR_MANAGEMENT = require('../middleware/error-management');

exports.getAllMessages = (req, res) => {
    BDD.query(MESSAGE.getAllMessages(), (err, result) => {
        if (err) {
            return res.status(500).json(ERROR_MANAGEMENT.error(err.message));
        } else {
            return res.status(201).json(ERROR_MANAGEMENT.success(result));
        }
    });
};

exports.deleteMessage = (req, res) => {
    BDD.query(MESSAGE.selectMessageById(), req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json(ERROR_MANAGEMENT.error(err.message));
        } else {
            if (result[0] != undefined) {
                if (req.params.id == result[0].id) {
                    BDD.query(MESSAGE.deleteMessage(), req.params.id, (err, result) => {
                        if (err) {
                            return res.status(403).json(ERROR_MANAGEMENT.error(err.message));
                        } else {
                            return res.status(200).json(ERROR_MANAGEMENT.success(result));
                        }
                    });
                } else {
                    return res.status(403).json(ERROR_MANAGEMENT.error('Vous ne pouvez pas supprimer ce message'));
                }
            } else {
                return res.status(404).json(ERROR_MANAGEMENT.error("Message non reconnu"));
            }
        }
    })
};

exports.addMessage = (req, res) => {
    BDD.query(MESSAGE.addMessage(), [
        req.body.content,
        req.body.user_id,
    ], (err, result) => {
        if (err) {
            return res.status(500).json(ERROR_MANAGEMENT.error(err.message));
        } else {
            return res.status(201).json(ERROR_MANAGEMENT.success(result));
        }
    });
};
