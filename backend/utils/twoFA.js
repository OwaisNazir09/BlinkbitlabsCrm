const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
require("dotenv").config();

const generateMasterSecret = async (adminEmail) => {
  try {
    if (!process.env.MASTER_ADMIN_SECRET) {
      throw new Error(
        "MASTER_ADMIN_SECRET is not set in environment variables!"
      );
    }

    const secret = {
      base32: process.env.MASTER_ADMIN_SECRET,
      otpauth_url: speakeasy.otpauthURL({
        secret: process.env.MASTER_ADMIN_SECRET,
        label: `MasterAdminPanel (${adminEmail})`,
        encoding: "base32",
      }),
    };

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    return {
      base32: secret.base32,
      otpauth_url: secret.otpauth_url,
      qrCodeDataURL,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = generateMasterSecret;
