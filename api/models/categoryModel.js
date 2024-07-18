const db = require("../database/db-client");

const categoryModel = {
  // Fonction pour créer une nouvelle catégorie
  createCategory: async ({ name }) => {
    const [result] = await db.query("INSERT INTO category (name) VALUES (?)", [
      name,
    ]);
    return result;
  },

  // Fonction pour récupérer toutes les catégories
  getAllCategories: async () => {
    const [rows] = await db.query("SELECT * FROM category");
    return rows;
  },

  // Fonction pour récupérer une catégorie par son ID
  getCategoryById: async (id) => {
    const [rows] = await db.query("SELECT * FROM category WHERE id = ?", [id]);
    return rows[0];
  },

  // Fonction pour mettre à jour une catégorie par son ID
  updateCategoryById: async (id, { name }) => {
    const [result] = await db.query(
      "UPDATE category SET name = ? WHERE id = ?",
      [name, id]
    );
    return result;
  },

  // Fonction pour supprimer une catégorie par son ID
  deleteCategoryById: async (id) => {
    const [result] = await db.query("DELETE FROM category WHERE id = ?", [id]);
    return result;
  },
};

module.exports = categoryModel;
