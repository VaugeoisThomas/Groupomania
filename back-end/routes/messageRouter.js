const express = require("express");
const router = express.Router();
const message = require('../controllers/messageController');
const auth = require("../middleware/authentication");

router.get('/', message.getAllMessages);
router.post('/', message.addMessage);
router.delete('/:id',auth, message.deleteMessage);

module.exports = router;