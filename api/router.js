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
const checkRoleUser = require("./services/checkRoleUser");
const validationPassword = require("./services/validationPassword");

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

// add user without role
router.post(
  "/users/register",
  validationEmailAndPassword,
  hashPassword,
  userController.addUserWithoutRole
);

// add user with role admin
router.post(
  "/users/signup",
  verifyToken,
  checkRoleUser,
  validationEmailAndPassword,
  hashPassword,
  userController.addUserWithRole
);

// update Password
router.patch(
  "/users/reset-password",
  verifyToken,
  validationPassword,
  hashNewPassword,
  userController.updatePassword
);

// update user
router.patch("/users", verifyToken, userController.updateUser);

// disabled account user
router.patch(
  "/users/disabled-user",
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
// get article count by user
router.get(
  "/articles/users/count",
  verifyToken,
  articleController.getArticleCount
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
router.post(
  "/categories",
  verifyToken,
  checkRoleUser,
  categoryController.createCategory
);

// Get all categories
router.get("/categories", categoryController.getAllCategories);

// Get a category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// Update a category by ID
router.put(
  "/categories/:id",
  verifyToken,
  categoryController.updateCategoryById
);

// Delete a category by ID
router.delete(
  "/categories/:id",
  verifyToken,
  checkRoleUser,
  categoryController.deleteCategoryById
);
/*=====================================
                Comment
======================================*/

// Create a new comment
router.post("/comments", verifyToken, commentController.createComment);

// Get all comments
router.get("/comments", commentController.getAllComments);
// get comment count by user
router.get(
  "/comments/users/count",
  verifyToken,
  commentController.getCommentCount
);
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

module.exports = router;
