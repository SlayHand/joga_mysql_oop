/* routes/article.js */
const express = require("express");
const router = express.Router();
const ArticleControllerClass = require("../controllers/article");
const articleController = new ArticleControllerClass();

// --- VIEWS (brauser) ---
router.get("/articles", (req, res) => articleController.listView(req, res));
router.get("/articles/new", (req, res) => articleController.newForm(req, res));
router.get("/articles/:slug", (req, res) =>
  articleController.showView(req, res)
);
router.get("/articles/:id/edit", (req, res) =>
  articleController.editForm(req, res)
);

// --- API (olemasolevad) ---
router.get("/", (req, res) => articleController.getAllArticles(req, res));
router.get("/article/:slug", (req, res) =>
  articleController.getArticleBySlug(req, res)
);
router.post("/article/create", (req, res) =>
  articleController.createArticle(req, res)
);
router.put("/article/edit/:id", (req, res) =>
  articleController.updateArticle(req, res)
);
router.delete("/article/delete/:id", (req, res) =>
  articleController.deleteArticle(req, res)
);

module.exports = router;
