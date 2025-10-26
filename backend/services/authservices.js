const User = require("../models/Admin");

const createUser = async (data) => {
  try {
    const user = new User({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role || "user",
      isActive: true,
      isLoggedIn: false,
    });
    return await user.save();
  } catch (error) {
    console.error("Error in createUser service:", error);
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error(error.message);
  }
};

const updateUserLoginStatus = async (email, status) => {
  try {
    return await User.findOneAndUpdate(
      { email },
      { isLoggedIn: status },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating login status:", error);
    throw new Error(error.message);
  }
};

const deactivateUser = async (email) => {
  try {
    return await User.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );
  } catch (error) {
    console.error("Error deactivating user:", error);
    throw new Error(error.message);
  }
};

const reactivateUser = async (email) => {
  try {
    return await User.findOneAndUpdate(
      { email },
      { isActive: true },
      { new: true }
    );
  } catch (error) {
    console.error("Error reactivating user:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserLoginStatus,
  deactivateUser,
  reactivateUser,
};
