const speakeasy = require("speakeasy");

const verifyAdminOTP = (req, res, next) => {
  const { otp } = req.body;
  const masterSecret = process.env.MASTER_ADMIN_SECRET;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required." });
  }

  if (!masterSecret) {
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const verified = speakeasy.totp.verify({
      secret: masterSecret,
      encoding: "base32",
      token: otp,
      window: 1,
    });

    if (!verified) {
      return res
        .status(401)
        .json({ message: "Invalid OTP. Action not allowed." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = verifyAdminOTP;
