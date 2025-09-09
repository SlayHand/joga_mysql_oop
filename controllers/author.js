const authorDBModel = require('../models/author');
const articleDBModel = require('../models/article');

const authorModel = new authorDBModel();
const articleModel = new articleDBModel();

class authorController {
    constructor() {
        const authors =[] 
    }

    async getAuthorById(req, res) {
        const author = await authorModel.findById(req.params.id);
        const articles = await articleModel.findMany(author);
        author.articles = articles;
        res.status(201).json({author: author});
    }
}

module.exports = authorController;