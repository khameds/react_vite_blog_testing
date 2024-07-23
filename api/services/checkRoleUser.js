const userModel = require("../models/userModel");

const checkRoleUser = async (req, res, next) => {
  try {
    const [user] = await userModel.getUserById(req.payload);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(401).json({
        success: false,
        status: 401,
        message: "Vous n'êtes pas authorisé à réaliser cette opération !",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = checkRoleUser;
