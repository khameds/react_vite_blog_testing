const argon2 = require("argon2");

const hashNewPassword = (req, res, next) => {
  const { newPassword, oldPassword } = req.body;
  console.log("req.body :>> ", req.body);
  if (!newPassword || !oldPassword) {
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
    .hash(newPassword, hashingOptions)
    .then((hashedPassword) => {
      delete req.body.newPassword;
      req.body.hashedPassword = hashedPassword;
      next();
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};
module.exports = hashNewPassword;
