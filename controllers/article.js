const ArticleDBModel = require("../models/article");
const articleModel = new ArticleDBModel();

class articleController {
  constructor() {
    this.articles = [];
  }

  async getAllArticles(req, res) {
    const articles = await articleModel.findAll();
    return res.status(200).json({ articles });
  }

  async getArticleBySlug(req, res) {
    const article = await articleModel.findOne(req.params.slug);
    return res.status(200).json({ article });
  }

  async createArticle(req, res) {
    const newArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace("T", " "),
      author_id: req.body.author_id,
    };
    const articleId = await articleModel.create(newArticle);

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect(`/articles/${newArticle.slug}`);
    }
    return res.status(201).json({
      message: `created article with id ${articleId}`,
      article: { id: articleId, ...newArticle },
    });
  }

  async updateArticle(req, res) {
    const updatedArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      author_id: req.body.author_id,
    };
    await articleModel.update(req.params.id, updatedArticle);

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect(`/articles/${updatedArticle.slug}`);
    }
    return res.status(200).json({
      message: `updated article with id ${req.params.id}`,
      article: { id: req.params.id, ...updatedArticle },
    });
  }

  async deleteArticle(req, res) {
    await articleModel.delete(req.params.id);

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/articles");
    }
    return res
      .status(200)
      .json({ message: `deleted article with id ${req.params.id}` });
  }

  async listView(req, res) {
    const articles = await articleModel.findAll();
    return res.render("articles/index", { title: "Kõik artiklid", articles });
  }

  async showView(req, res) {
    const article = await articleModel.findOne(req.params.slug);
    if (!article)
      return res.status(404).render("404", { title: "Artiklit ei leitud" });
    return res.render("articles/show", {
      title: article.name || article.title || "Artikkel",
      article,
    });
  }

  newForm(req, res) {
    return res.render("articles/new", { title: "Lisa artikkel" });
  }

  async editForm(req, res) {
    const id = req.params.id;
    const current = await require("../models/base").prototype.findById.call(
      articleModel,
      id
    );
    if (!current)
      return res.status(404).render("404", { title: "Artiklit ei leitud" });
    return res.render("articles/edit", {
      title: "Muuda artiklit",
      article: current,
    });
  }
}

module.exports = articleController;
