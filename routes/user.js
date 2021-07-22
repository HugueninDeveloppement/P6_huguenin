const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const userCtrl = require('../controllers/user');
const user = require('../models/user');

/**route user
*   /api/auth/signup
*   /api/auth/login
**/

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;