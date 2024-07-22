const articleModel = require("../models/articleModel");

const articleController = {
  createArticle: async (req, res) => {
    try {
      const result = await articleModel.createArticle(req.payload, req.body);
      res.status(201).json({ success: true, status: 201, data: result });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getAllArticles: async (req, res) => {
    try {
      const articles = await articleModel.getAllArticles();
      res.status(200).json({ success: true, status: 200, data: articles });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
  getAllArticlesByUser: async (req, res) => {
    try {
      const articles = await articleModel.getAllArticlesByUser(req.payload);
      res.status(200).json({ success: true, status: 200, data: articles });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await articleModel.getArticleById(req.params.id);
      if (!article) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Article not found" });
      }
      res.status(200).json({ success: true, status: 200, data: article });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  updateArticleById: async (req, res) => {
    try {
      const result = await articleModel.updateArticleById(
        req.params.id,
        req.body
      );
      if (!result.affectedRows) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Article not found" });
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Article updated successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  deleteArticleById: async (req, res) => {
    try {
      const result = await articleModel.deleteArticleById(req.params.id);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Article not found" });
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Article deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
  getArticleCount: async (req, res) => {
    try {
      const count = await articleModel.getArticleCount(req.payload);

      res
        .status(200)
        .json({ success: true, status: 200, data: count[0]["article"] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
};

module.exports = articleController;
