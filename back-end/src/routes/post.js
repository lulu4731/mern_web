const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
const verifyToken = require('../../middleware/auth');


router.post('/add', verifyToken, PostController.addPost);
router.put('/:id', verifyToken, PostController.updatePost);
router.delete('/:id', verifyToken, PostController.deletePost);
router.get('/', verifyToken, PostController.getPost);


module.exports = router;