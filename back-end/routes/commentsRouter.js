const express = require("express");
const router = express.Router();
const auth = require('../middleware/authentication');
const comments = require('../controllers/commentsController');

//router.post('/', comments.addComments);
//router.get('/', comments.getComments);
//router.delete('/:id', auth, comments.deleteComment);

module.exports = router;