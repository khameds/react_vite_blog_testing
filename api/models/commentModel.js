const db = require("../database/db-client");

const commentModel = {
  // Fonction pour créer un nouveau commentaire
  createComment: async (user_id, { description, article_id }) => {
    const [result] = await db.query(
      "INSERT INTO comment (description, user_id, article_id) VALUES (?, ?, ?)",
      [description, user_id, article_id]
    );
    return result;
  },
  getCommentWithArticleAndUser: async () => {
    const [rows] = await db.query(
      `
      SELECT
        a.id AS article_id,
        a.title AS article_title,
        a.description AS article_description,
        a.user_id AS userId,
          JSON_ARRAYAGG(
          JSON_OBJECT(
            'comment_id', c.id,
            'comment_description', c.description,
            'comment_created_at', c.created_at,
            'comment_updated_at', c.updated_at,
            'user_id', u.id,
            'user_info', CONCAT(u.firstname, ' ', u.lastname),
            'user_pseudo', u.pseudo,
            'user_email', u.email,
            'user_status', u.status,
            'user_avatar', u.avatar
          )
        ) AS comments
      FROM
        comment c
      JOIN
        user u ON c.user_id = u.id
      JOIN
        article a ON c.article_id = a.id
      GROUP BY
        a.id, a.title, a.description
      ORDER BY
        a.id;
    `
    );
    return rows;
  },

  // Fonction pour récupérer un commentaire par son ID
  getCommentById: async (id) => {
    const [rows] = await db.query("SELECT * FROM comment WHERE id = ?", [id]);
    return rows;
  },
  // Fonction pour mettre à jour un commentaire par son ID
  updateCommentById: async (id, user_id, { description, article_id }) => {
    const [result] = await db.query(
      "UPDATE comment SET description = ?, user_id = ?, article_id = ? WHERE id = ?",
      [description, user_id, article_id, id]
    );
    return result;
  },
  // Fonction pour supprimer un commentaire par son ID
  deleteCommentById: async (id, user_id) => {
    const [result] = await db.query(
      "DELETE FROM comment WHERE id = ? And user_id=?",
      [id, user_id]
    );
    return result;
  },
  getCommentCount: async (userId) => {
    const [result] = await db.query(
      "SELECT COUNT(*) as count FROM comment WHERE user_id = ?",
      [userId]
    );
    return result;
  },
};

module.exports = commentModel;
