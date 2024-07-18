const db = require("../database/db-client");

const userModel = {
  getAllUsers: async () => {
    const [users] = await db.query(
      "select id, firstname, lastname, email, pseudo, avatar, status from user"
    );
    return users;
  },

  getUserByEmail: async (email) => {
    const [user] = await db.query("select * from user where email= ?", [email]);
    return user;
  },
  getUserById: async (id) => {
    const [user] = await db.query(
      "select id, firstname, lastname, email, pseudo, avatar, status from user where id=? ",
      [id]
    );
    return user;
  },
  addUser: async ({
    firstname,
    lastname,
    email,
    hashedPassword,
    avatar,
    pseudo,
  }) => {
    const [results] = await db.query(
      "insert into user (firstname, lastname, email, hashedPassword, pseudo, avatar ) values (?,?,?,?,?,?)",
      [firstname, lastname, email, hashedPassword, pseudo, avatar]
    );
    return results;
  },

  updateUser: async (userId, updates) => {
    try {
      const setClause = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const sqlQuery = `UPDATE user SET ${setClause} WHERE id = ?`;

      const values = [...Object.values(updates), userId];

      const [result] = await db.query(sqlQuery, values);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updatePassword: async (password) => {
    const [results] = await db.query("update user set hashedPassword = ?", [
      password,
    ]);
    return results;
  },

  disableUserAccount: async (id) => {
    const result = await db.query("UPDATE user SET status = ? WHERE id = ?", [
      1,
      id,
    ]);
    return result;
  },
};

module.exports = userModel;
