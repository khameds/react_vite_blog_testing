const db = require("../database/db-client");

const commentModel = {
  // Fonction pour créer un nouveau commentaire
  createComment: async ({ description, user_id, article_id }) => {
    const [result] = await db.query(
      "INSERT INTO comment (description, user_id, article_id) VALUES (?, ?, ?)",
      [description, user_id, article_id]
    );
    return result;
  },
  // Fonction pour récupérer tous les commentaires
  getAllComments: async () => {
    const [rows] = await db.query("SELECT * FROM comment");
    return rows;
  },
  // Fonction pour récupérer un commentaire par son ID
  getCommentById: async (id) => {
    const [rows] = await db.query("SELECT * FROM comment WHERE id = ?", [id]);
    return rows[0];
  },
  // Fonction pour mettre à jour un commentaire par son ID
  updateCommentById: async (id, { description, user_id, article_id }) => {
    const [result] = await db.query(
      "UPDATE comment SET description = ?, user_id = ?, article_id = ? WHERE id = ?",
      [description, user_id, article_id, id]
    );
    return result;
  },
  // Fonction pour supprimer un commentaire par son ID
  deleteCommentById: async (id) => {
    const [result] = await db.query("DELETE FROM comment WHERE id = ?", [id]);
    return result;
  },
  getCommentWithArticleAndComment: async () => {
    const [rows] = await db.query(
      `
      SELECT c.id, c.description AS comment_description, c.created_at AS comment_created_at, c.updated_at AS comment_updated_at, u.firstname   AS user_firstname, u.lastname AS user_lastname, u.email AS user_email,a.title AS article_title, a.description AS article_description FROM comment c 
      JOIN user u ON c.user_id = u.id
      JOIN article a ON c.article_id = a.id
      ORDER BY c.created_at DESC
    `
    );
    return rows;
  },
};

module.exports = commentModel;
