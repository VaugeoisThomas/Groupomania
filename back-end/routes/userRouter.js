const Express = require("express");
const Router = Express.Router();
const User = require('../controllers/userController');
const auth = require('../middleware/authentication');

Router.post('/', User.createUser);
Router.get('/', User.selectAllUsers);
Router.post('/login', User.login);
Router.get('/:id', User.selectOneUser);
Router.delete('/:id', auth, User.deleteOneUser);
Router.put('/:id/updateProfil', User.updateAccount);

module.exports = Router;