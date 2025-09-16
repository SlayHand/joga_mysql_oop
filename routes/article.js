const express = require('express');
const router = express.Router();
const articleControllerClass = require('../controllers/article');
const articleController = new articleControllerClass();

router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
router.post('/article/create', (req, res) => articleController.createArticle(req, res));
router.put('/article/edit/:id', (req, res) => articleController.updateArticle(req, res));
router.delete('/article/delete/:id', (req, res) => articleController.deleteArticle(req, res));

module.exports = router;