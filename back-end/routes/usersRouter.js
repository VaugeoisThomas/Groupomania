const express = require("express");
const router = express.Router();
const users = require('../controllers/usersController');
const auth = require('../middleware/authentication');

router.post('/', users.createUser);
router.get('/', users.selectAllUsers);
router.post('/login', users.login);
router.get('/:id', users.selectOneUser);
router.put('/:id/profil', auth, users.updateUserProfil);
router.delete('/:id', auth, users.deleteOneUser);

module.exports = router;