const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(401).json({
      success: false,
      status: 401,
      message: "Vérifier vos données !",
    });
    return;
  }
  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      delete req.body.password;
      req.body.hashedPassword = hashedPassword;
      next();
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};
module.exports = hashPassword;
