const express = require("express");
const router = express.Router();
const post = require('../controllers/postController');
const auth = require("../middleware/authentication");

router.get('/', post.getAllPosts);
router.post('/', post.addPost);
router.delete('/:id', post.deletePost);

module.exports = router;