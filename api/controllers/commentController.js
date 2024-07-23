const commentModel = require("../models/commentModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const result = await commentModel.createComment(req.payload, req.body);
      res.status(201).json({ success: true, status: 201, data: result });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await commentModel.getCommentWithArticleAndUser();
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
          .json({ success: false, status: 404, message: "Comment not found" });
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
        req.payload,
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
      const [comment] = await commentModel.getCommentById(req.params.id);

      if (comment.user_id !== req.payload) {
        return res.status(401).json({
          success: false,
          status: 404,
          message: "Vous n'êtes pas à réaliser cette opération !",
        });
      }

      const result = await commentModel.deleteCommentById(
        parseInt(req.params.id),
        req.payload
      );
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
  getCommentCount: async (req, res) => {
    try {
      const count = await commentModel.getCommentCount(req.payload);
      res
        .status(200)
        .json({ success: true, status: 200, data: count[0]["count"] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
};

module.exports = commentController;
