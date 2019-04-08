const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator')

const userController = require('../controllers/user.controller');

router.post('/create', validator.createUser(), validator.result, userController.createUser)
router.post('/login', validator.login(), validator.result, userController.loginUser)

module.exports = router;