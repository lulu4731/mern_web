const express = require('express');
const verifyToken = require('../../middleware/auth');
const AuthController = require('../app/controllers/AuthController');
const router = express.Router();

//@route POST api/auth/register

router.post('/register', AuthController.registerAuth);
router.post('/login', AuthController.loginAuth);
router.get('/', verifyToken, AuthController.checkLogin);


module.exports = router;