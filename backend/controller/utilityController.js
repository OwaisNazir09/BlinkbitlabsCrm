const Admin = require("../models/Admin");

const findUserByEmail = async (email) => {
  try {
    const user = await Admin.findOne({ email });
    return user; 
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error; 
  }
};

module.exports = { findUserByEmail };
