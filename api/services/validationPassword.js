const validationPassword = (req, res, next) => {
  try {
    const { newPassword, oldPassword } = req.body;

    console.log("newPassword :>> ", newPassword);
    console.log("oldPassword :>> ", oldPassword);
    if (!newPassword || !oldPassword) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Vérifier vos données !",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Vos données ne sont pas valides",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = validationPassword;
