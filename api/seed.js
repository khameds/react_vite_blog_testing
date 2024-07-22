require("dotenv").config();
const argon2 = require("argon2");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const mysql = require("mysql2/promise");

const seed = async () => {
  try {
    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    };

    const hashedPassword = await argon2.hash("Azerty123!", hashingOptions);
    console.log(
      "%capiseed.js:16 hashedPassword",
      "color: #007acc;",
      hashedPassword
    );
    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    /////////////////////////////////////////////////////////////////
    // Execute the SQL statements to create a regular user
    /////////////////////////////////////////////////////////////////
    await database.query(
      "INSERT INTO user (firstname, lastname, email, hashedPassword, pseudo, avatar ) values (?,?,?,?,?,?)",
      [
        "userFirstname",
        "userLastname",
        "user@mail.com",
        hashedPassword,
        "user",
        "",
      ]
    );
    let result = await database.query("SELECT id FROM user WHERE email = (?)", [
      "user@mail.com",
    ]);
    const userId = result[0][0].id;
    console.log("%capiseed.js:34 userId", "color: #007acc;", userId);

    /////////////////////////////////////////////////////////////////
    // Execute the SQL statements to create an admin user
    /////////////////////////////////////////////////////////////////
    await database.query(
      "INSERT INTO user (firstname, lastname, email, hashedPassword, pseudo, avatar, role) values (?,?,?,?,?,?,?)",
      [
        "adminFirstname",
        "adminLastname",
        "admin@mail.com",
        hashedPassword,
        "admin",
        "",
        "admin",
      ]
    );

    result = await database.query("SELECT id FROM user WHERE email = (?)", [
      "admin@mail.com",
    ]);
    const adminId = result[0][0].id;
    console.log("%capiseed.js:44 adminId", "color: #007acc;", adminId);

    /////////////////////////////////////////////////////////////////
    // Execute the SQL statements to create a category
    /////////////////////////////////////////////////////////////////
    await database.query("INSERT INTO category (name) VALUES (?)", [
      "testCategory",
    ]);
    result = await database.query("SELECT * FROM category");
    const categoryId = result[0][0].id;
    console.log("%capiseed.js:77 categoryId", "color: #007acc;", categoryId);

    console.info(`${DB_NAME} updated`);

    /////////////////////////////////////////////////////////////////
    // Execute the SQL statements to create an article
    /////////////////////////////////////////////////////////////////
    await database.query(
      "INSERT INTO article (title, description, category_id, user_id) VALUES (?, ?, ?, ?)",
      ["articleTitle", "articleDescription", categoryId, userId]
    );
    result = await database.query("SELECT * FROM article");
    const articleId = result[0][0].id;
    console.log("%capiseed.js:77 articleId", "color: #007acc;", articleId);

    console.info(`${DB_NAME} updated`);

    // Close the database connection
    database.end();
  } catch (err) {
    console.error("Error seeding the database:", err.message);
  }
};

// Run the seed function
seed();
