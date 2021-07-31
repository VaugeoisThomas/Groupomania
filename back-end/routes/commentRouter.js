const Express = require("Express");
const ROUTER = Express.Router();
const AUTH = require('../middleware/authentication');
const COMMENT = require('../controllers/commentController');

//ROUTER.post('/', COMMENT.addComments);
//ROUTER.get('/', COMMENT.getComments);
//ROUTER.delete('/:id', AUTH, COMMENT.deleteComment);

module.exports = ROUTER;