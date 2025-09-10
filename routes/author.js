const express = require('express');
const router = express.Router();
const authorControllerClass = require('../controllers/author');
const authorController = new authorControllerClass();

router.get('/author/:id', (req, res) => authorController.getAuthorById(req, res));


module.exports = router;