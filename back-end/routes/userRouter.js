const express = require("express");
const router = express.Router();
const user = require('../controllers/userController');
const auth = require('../middleware/authentication');

router.post('/', user.createUser);
router.get('/', user.selectAllUsers);
router.post('/login', user.login);
router.get('/:id', user.selectOneUser);
router.delete('/:id', auth, user.deleteOneUser);
router.put('/:id/updateProfil', auth, user.updateAccount);

module.exports = router;