const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // get le token dans le headers
  try {
    const tokenInHeaders = req.get("Authorization");
    if (!tokenInHeaders) {
      return res.status(401).json({
        success: false,
        status: 401,
        message:
          "Vous n'êtes pas authorisé à realiser cette action, Connectz-vous ! ",
      });
    }

    const [type, token] = tokenInHeaders.split(" ");
    console.log("token :>> ", token);
    if (type !== "Bearer") {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Erreur d'authentification, vérifier le type de token",
      });
    }
    console.log("token :>> ", token);

    // de verifier le token
    const { payload } = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.payload = payload;
    console.log("payload :>> ", payload);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = verifyToken;
