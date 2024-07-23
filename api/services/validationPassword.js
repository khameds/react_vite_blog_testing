const validationPassword = (req, res, next) => {
  try {
    const { newPassword, oldPassword } = req.body;

    if (!newPassword || !oldPassword) {
      res.status(401).json({
        success: false,
        status: 401,
        message: "Vérifier vos données !",
      });
      return;
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
