const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const authController = require("../controller/authController");
const joi = require("../validators/MasterAdminValidator");

router.post("/createAcct", authController.CreateAcct);
router.post("/login", joi.validateLogin, authController.login);
router.post("/logout", auth, authController.logout);

module.exports = router;
