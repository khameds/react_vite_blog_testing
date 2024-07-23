const userModel = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      if (users) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "Liste des users trouvée !",
          users,
        });
      } else {
        res.status(200).json({
          success: true,
          status: 200,
          message: "Aucun users n'est enregistré !",
          users,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const users = await userModel.getUserById(req.payload);
      if (users) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "user trouvé !",
          users,
        });
      } else {
        res.status(404).json({
          success: false,
          status: 404,
          message: "Not found !",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  addUserWithoutRole: async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email);

      if (user.length !== 0) {
        res.status(409).json({
          success: false,
          status: 409,
          message: `cet email ${user[0].email} est déjà utilisé par un autre utlisateur !`,
        });
      } else {
        const results = await userModel.addUserWithoutRole(req.body);
        if (results.affectedRows) {
          res.status(201).json({
            success: true,
            status: 201,
            message: `Félicitaion ! votre compte à été bien créer`,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  addUserWithRole: async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email);

      if (user.length !== 0) {
        res.status(409).json({
          success: false,
          status: 409,
          message: `cet email ${user[0].email} est déjà utilisé par un autre utlisateur !`,
        });
      } else {
        const results = await userModel.addUserWithRole(req.body);
        if (results.affectedRows) {
          res.status(201).json({
            success: true,
            status: 201,
            message: `Félicitaion ! votre compte à été bien créer`,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      if (req.body.password || req.body.email) {
        res.status(401).json({
          success: false,
          status: 401,
          message: "Vous n'êtes pas authorisé à réaliser cette opération",
        });
        return;
      }

      const results = await userModel.updateUser(req.payload, req.body);
      if (results.affectedRows) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "Vos données sont mises à jour !",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { oldPassword, hashedPassword } = req.body;

      const user = await userModel.getUserById(req.payload);
      if (user.length) {
        const isMatch = await argon2.verify(
          user[0].hashedPassword,
          oldPassword
        );

        if (typeof isMatch === "boolean" && isMatch) {
          const result = await userModel.updatePassword(
            req.payload,
            hashedPassword
          );

          if (result.affectedRows) {
            res.status(200).json({
              success: true,
              status: 200,
              message: "Votre oppération est réalisée avec success !",
            });
          }
        } else {
          res.status(401).json({
            success: false,
            status: 401,
            message: "Vérifier vos données !",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  disableUserAccount: async (req, res) => {
    try {
      const [user] = await userModel.disableUserAccount(req.payload);
      if (user.affectedRows) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "La désactivation du compte a été effectuée avec succès",
        });
      } else {
        res.status(401).json({
          sucess: false,
          status: 401,
          message: "Problème lors de la désactivation du compte",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.getUserByEmail(email);

      if (user.length && !user[0].status) {
        const isMatch = await argon2.verify(user[0].hashedPassword, password);
        if (typeof isMatch === "boolean" && isMatch) {
          const token = jwt.sign(
            { payload: user[0].id },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            success: true,
            status: 200,
            message: `Bienvenu ${user[0].pseudo} `,
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            status: 401,
            message: "verifier vos informations ",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          status: 401,
          message: "l'adresse mail n'existe pas ou votre compte est désactivé",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
  logout: async (req, res) => {
    try {
      console.log("req.payload logout controller:>> ", req.payload);
      const user = await userModel.getUserById(req.payload);
      const token = jwt.sign(
        { payload: user[0].id },
        process.env.SECRET_KEY_JWT,
        {
          expiresIn: "0",
        }
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: `Au revoire ${user[0].pseudo} `,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
