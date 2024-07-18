const validationEmailAndPassword = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Vos données ne sont pas valides",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
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

module.exports = validationEmailAndPassword;
