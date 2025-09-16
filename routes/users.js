const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/users/register', (req, res) =>  userController.register(req, res) );
router.post('/users/login', (req, res) =>  userController.login(req, res) );

module.exports = router;