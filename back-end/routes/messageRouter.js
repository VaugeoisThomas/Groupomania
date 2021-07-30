const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const MESSAGE = require('../controllers/messageController');

ROUTER.get('/', MESSAGE.getAllMessages);
ROUTER.delete('/:id', MESSAGE.deleteMessage);
ROUTER.post('/', MESSAGE.addMessage);
module.exports = ROUTER;