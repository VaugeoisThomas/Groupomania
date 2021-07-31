const Express = require("Express");
const ROUTER = Express.Router();
const USER = require('../controllers/userController');
const AUTH = require('../middleware/authentication');

ROUTER.post('/', USER.createUser);
ROUTER.get('/', USER.selectAllUsers);
ROUTER.post('/login', USER.login);
ROUTER.get('/:id', USER.selectOneUser);
ROUTER.delete('/:id', AUTH, USER.deleteOneUser);
ROUTER.put('/:id/updateProfil', USER.updateAccount);

module.exports = ROUTER;