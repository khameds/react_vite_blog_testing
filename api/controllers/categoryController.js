const categoryModel = require("../models/categoryModel");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const categoryRegex = /^[a-zA-Z]{3,}$/;
      const { name } = req.body;
      if (name.match(categoryRegex)) {
        const result = await categoryModel.createCategory(req.body);
        res.status(201).json({ success: true, status: 201, data: result });
      } else {
        res.status(401).json({
          success: false,
          status: 401,
          message:
            "Le titre doit avoir au minimum 3 lettres, sans chiffres ni caractères spéciaux",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryModel.getAllCategories();
      res.status(200).json({ success: true, status: 200, data: categories });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await categoryModel.getCategoryById(req.params.id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Category not found" });
      }
      res.status(200).json({ success: true, status: 200, data: category });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  updateCategoryById: async (req, res) => {
    try {
      const categoryRegex = /^[a-zA-Z]{3,}$/;
      const { name } = req.body;
      const category = await categoryModel.getCategoryById(req.params.id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Category not found" });
      }

      if (name.match(categoryRegex)) {
        const result = await categoryModel.updateCategoryById(
          req.params.id,
          req.body
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            status: 404,
            message: "Category not found",
          });
        }
        res.status(200).json({
          success: true,
          status: 200,
          message: "Category updated successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          status: 401,
          message:
            "Le titre doit avoir au minimum 3 lettres, sans chiffres ni caractères spéciaux",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },

  deleteCategoryById: async (req, res) => {
    try {
      const category = await categoryModel.getCategoryById(req.params.id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Category not found" });
      }
      const result = await categoryModel.deleteCategoryById(req.params.id);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: "Category not found" });
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Category deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, status: 500, message: error.message });
    }
  },
};

module.exports = categoryController;
