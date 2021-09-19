const express = require("express");
const router = express.Router();
const comment = require('../controllers/commentController');
const auth = require('../middleware/authentication');

router.get('/', comment.getAllComments);
router.get('/:id/post', comment.getNumberOfCommentByPost);
router.get('/:id', comment.getCommentsByPost)
router.post('/', comment.addComments);
router.delete('/:id/post/:postId', auth, comment.deleteComment);

module.exports = router;