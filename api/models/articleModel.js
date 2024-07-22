const db = require("../database/db-client");

const articleModel = {
  // Fonction pour créer un nouvel article
  createArticle: async (user_id, { title, description, category_id }) => {
    const [result] = await db.query(
      "INSERT INTO article (title, description, category_id, user_id) VALUES (?, ?, ?, ?)",
      [title, description, category_id, user_id]
    );
    return result;
  },
  getAllArticles: async () => {
    const query = `
    SELECT a.id, a.title, u.firstname AS user_firstname, u.lastname AS user_lastname, u.email AS user_email, c.name AS category_name
    FROM article a
    JOIN user u ON a.user_id = u.id
    JOIN category c ON a.category_id = c.id
  `;
    const [rows] = await db.query(query);
    return rows;
  },
  // Fonction pour récupérer tous les articles par user
  getAllArticlesByUser: async (id) => {
    const [rows] = await db.query(
      `
  SELECT 
  u.id AS user_id, 
  u.firstname, 
  u.lastname,  
  COALESCE(JSON_ARRAYAGG(
    JSON_OBJECT(
      'article_id', a.id,
      'title', a.title,
      'description', a.description,
      'category_name', c.name,
      'created_at', a.created_at,
      'updated_at', a.updated_at
    )
  ), JSON_ARRAY()) AS articles
FROM user u
LEFT JOIN article a ON u.id = a.user_id
LEFT JOIN category c ON a.category_id = c.id
WHERE user_id = ?
GROUP BY user_id, u.firstname, u.lastname
  `,
      [id]
    );

    return rows;
  },

  // Fonction pour récupérer un article par son ID
  getArticleById: async (id) => {
    const [rows] = await db.query(
      `
    SELECT a.*, u.firstname AS user_firstname, u.lastname AS user_lastname, u.email AS user_email, c.name AS category_name
    FROM article a
    JOIN user u ON a.user_id = u.id
    JOIN category c ON a.category_id = c.id
    WHERE a.id = ?
  `,
      [id]
    );
    return rows[0];
  },

  // Fonction pour mettre à jour un article par son ID
  updateArticleById: async (id, { title, description, category_id }) => {
    const [result] = await db.query(
      "UPDATE article SET title = ?, description = ?, category_id = ? WHERE id = ?",
      [title, description, category_id, id]
    );
    return result;
  },

  // Fonction pour supprimer un article par son ID
  deleteArticleById: async (id) => {
    const [result] = await db.query("DELETE FROM article WHERE id = ?", [id]);
    return result;
  },
  getArticleCount: async (userId) => {
    const [result] = await db.query(
      "SELECT COUNT(*) as article FROM comment WHERE user_id = ?",
      [userId]
    );
    return result;
  },
};

module.exports = articleModel;
