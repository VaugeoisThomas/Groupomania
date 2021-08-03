const Express = require("express");
const Router = Express.Router();
const Message = require('../controllers/messageController');
const auth = require("../middleware/authentication");

Router.get('/', Message.getAllMessages);
Router.post('/', Message.addMessage);
Router.delete('/:id',auth, Message.deleteMessage);
module.exports = Router;