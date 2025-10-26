const Enquiry = require("../models/enquiry");

const createEnquiry = async (data) => {
  try {
    const enquiry = new Enquiry(data);
    return await enquiry.save();
  } catch (error) {
    console.error("Error in createEnquiry service:", error);
    throw new Error(error.message);
  }
};

const getAllEnquiries = async () => {
  try {
    return await Enquiry.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error in getAllEnquiries service:", error);
    throw new Error(error.message);
  }
};

const getEnquiryById = async (id) => {
  try {
    return await Enquiry.findById(id);
  } catch (error) {
    console.error("Error in getEnquiryById service:", error);
    throw new Error(error.message);
  }
};

const updateEnquiry = async (id, data) => {
  try {
    return await Enquiry.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("Error in updateEnquiry service:", error);
    throw new Error(error.message);
  }
};

const deleteEnquiry = async (id) => {
  try {
    const result = await Enquiry.findByIdAndDelete(id);
    return result !== null; // true if deleted, false if not found
  } catch (error) {
    console.error("Error in deleteEnquiry service:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
