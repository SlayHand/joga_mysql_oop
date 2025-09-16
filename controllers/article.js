const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        this.articles = [];
    } 

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll();
        res.status(201).json({articles: articles});
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        res.status(201).json({article: article});
    }
    async createArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        };
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({
           message: `created article with id ${articleId}`,
           article: {id: articleId, ...newArticle}
        })
    }
    async updateArticle(req, res) {
        const updatedArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id
        };
        await articleModel.update(req.params.id, updatedArticle);
        res.status(201).json({
           message: `updated article with id ${req.params.id}`,
           article: {id: req.params.id, ...updatedArticle}
        })
    }
    async deleteArticle(req, res) {
        await articleModel.delete(req.params.id);
        res.status(200).json({
           message: `deleted article with id ${req.params.id}`
        })
    }   
}

module.exports = articleController;