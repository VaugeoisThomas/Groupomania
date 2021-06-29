const express = require("express");
const router = express.Router();
const messages = require('../controllers/messagesController');

router.get('/', messages.getAllMessages);
router.delete('/:id', messages.deleteMessage);
module.exports = router;