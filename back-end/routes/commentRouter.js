const Express = require("express");
const Router = Express.Router();
const Comment = require('../controllers/commentController');
const auth = require('../middleware/authentication');

Router.get('/', Comment.getAllComments);
Router.post('/', Comment.addComments);
Router.delete('/:id', auth, Comment.deleteComment);

module.exports = Router;