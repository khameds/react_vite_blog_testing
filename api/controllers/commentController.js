const commentModel = require("../models/commentModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const result = await commentModel.createComment(req.body);
      res.status(201).json({ success: true, status: 201, data: result });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await commentModel.getAllComments();
      res.status(200).json({ success: true, status: 200, data: comments });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const comment = await commentModel.getCommentById(req.params.id);
      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }
      res.status(200).json({ success: true, status: 200, data: comment });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  updateCommentById: async (req, res) => {
    try {
      const result = await commentModel.updateCommentById(
        req.params.id,
        req.body
      );
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Comment not found" });
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comment updated successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  deleteCommentById: async (req, res) => {
    try {
      const result = await commentModel.deleteCommentById(req.params.id);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Comment not found" });
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
  getCommentWithArticleAndComment: async (req, res) => {
    try {
      const comments = await commentModel.getCommentWithArticleAndComment();

      res.status(200).json({ success: true, status: 200, data: comments });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
};

module.exports = commentController;
