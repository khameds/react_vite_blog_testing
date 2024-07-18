const express = require("express");
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const hashPassword = require("./services/hashedPassword");
const hashNewPassword = require("./services/hashedNewPassword");
const verifyToken = require("./services/verifyToken");
const validationEmailAndPassword = require("./services/validation");
const categoryController = require("./controllers/categoryController");
const commentController = require("./controllers/commentController");
const articleController = require("./controllers/articleController");

const router = express.Router();

/*=====================================
                Home
======================================*/
router.get("/", homeController);

/*=====================================
                User
======================================*/

// get All users
router.get("/users", userController.getAllUsers);
// get user by id
router.get("/users/profile", verifyToken, userController.getUserById);

// add user
router.post(
  "/users/register",
  validationEmailAndPassword,
  hashPassword,
  userController.addUser
);

// update user
router.patch("/users/:id", userController.updateUser);
// update Password
router.patch(
  "/user/reset-password",
  hashNewPassword,
  userController.updatePassword
);

// disabled account user
router.patch(
  "/user/disabled-user",
  verifyToken,
  userController.disableUserAccount
);
// login user
router.post("/users/login", validationEmailAndPassword, userController.login);
// logout user
router.post("/users/logout", verifyToken, userController.logout);

/*=====================================
                Article
======================================*/

// Create a new article
router.post("/articles", verifyToken, articleController.createArticle);

// Get all articles
router.get("/articles", articleController.getAllArticles);
// get an article by user
router.get(
  "/articles/user",
  verifyToken,
  articleController.getAllArticlesByUser
);

// Get an article by ID
router.get("/articles/:id", articleController.getArticleById);

// update an article
router.put("/articles/:id", articleController.updateArticleById);

// Delete an article by ID
router.delete("/articles/:id", articleController.deleteArticleById);
/*=====================================
                Category
======================================*/

// Create a new category
router.post("/categories", categoryController.createCategory);

// Get all categories
router.get("/categories", categoryController.getAllCategories);

// Get a category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// Update a category by ID
router.put("/categories/:id", categoryController.updateCategoryById);

// Delete a category by ID
router.delete("/categories/:id", categoryController.deleteCategoryById);
/*=====================================
                Comment
======================================*/

// Create a new comment
router.post("/comments", verifyToken, commentController.createComment);

// Get all comments
router.get("/comments", commentController.getAllComments);

// Get a comment by ID
router.get("/comments/:id", commentController.getCommentById);

// Update a comment by ID
router.put("/comments/:id", verifyToken, commentController.updateCommentById);

// Delete a comment by ID
router.delete(
  "/comments/:id",
  verifyToken,
  commentController.deleteCommentById
);
// get comment with user and articles
router.get(
  "/comments/details",
  commentController.getCommentWithArticleAndComment
);
module.exports = router;
