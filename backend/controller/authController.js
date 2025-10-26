const bcrypt = require("bcrypt");
const authservice = require("../services/authservices");
const utils = require("./utilityController");
const sendEmail = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");

const CreateAcct = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await utils.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ isResult: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authservice.createUser({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    try {
      await sendEmail(email, "welcomeMail");
    } catch (err) {
      console.error("Mail error:", err);
    }

    return res.status(201).json({
      isResult: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Create Account error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await utils.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ isResult: false, message: "User not found" });
    }

    if (user.isActive === false) {
      return res.status(400).json({
        isResult: false,
        message: "Account Deactivted please contact to admin ",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ isResult: false, message: "Invalid password" });
    }

    try {
      await sendEmail(email, "loginMail");
    } catch (err) {
      console.error("Mail error:", err);
    }

    try {
      await authservice.updateUserLoginStatus(email, true);
    } catch (err) {
      console.error("Login status update error:", err);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, res.cookieOptions);

    return res.status(200).json({
      isResult: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const email = req.user?.email;

    if (email) {
      try {
        await authservice.updateUserLoginStatus(email, false);
      } catch (err) {
        console.error("Error updating login status:", err);
      }
    }

    res.clearCookie("token", res.cookieOptions);
    return res.status(200).json({
      isResult: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  CreateAcct,
  logout,
};
