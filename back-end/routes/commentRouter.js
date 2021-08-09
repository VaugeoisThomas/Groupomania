/*const express = require("express");
const router = express.Router();
const comment = require('../controllers/commentController');
const auth = require('../middleware/authentication');

router.get('/', comment.getAllComments);
router.get('/:id/messages', comment.getCommentForOneMessage);
router.post('/', comment.addComments);
router.delete('/:id', auth, comment.deleteComment);

module.exports = router;*/