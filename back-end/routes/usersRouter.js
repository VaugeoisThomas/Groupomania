const express = require("express");
const router = express.Router();
const users = require('../controllers/usersController');
const auth = require('../middleware/authentication');

router.post('/', users.createUser);
router.get('/', users.selectAllUsers);
router.post('/login', users.login);
router.get('/:id', users.selectOneUser);
//router.put('/:id/profil', users.createUserProfil);
router.delete('/:id', auth, users.deleteOneUser);
/*router.put('/:id', auth, users.modifyOneUser);


router.put('/:id/updateUserName', auth, users.updateUserName);
router.put('/:id/updateUsersEmail', auth, users.updateUsersEmail);
router.put('/:id/updateUsersAge', auth, users.updateUsersAge);
router.put('/:id/updateUsersBiography', auth, users.updateUsersBiography);*/

module.exports = router;