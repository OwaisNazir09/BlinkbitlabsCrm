const enquiryService = require("../services/enquiryServices");

const addEnquiry = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      country,
      postalCode,
      company,
      position,
      website,
      notes,
      status,
    } = req.body;

    const newEnquiry = await enquiryService.createEnquiry({
      firstName,
      lastName,
      email,
      phone,
      address: { street, city, state, country, postalCode },
      company,
      position,
      website,
      notes,
      status: status || "Active",
      createdBy: req.user?._id, // if you want to track the creator
    });

    return res.status(201).json({
      isResult: true,
      message: "Enquiry added successfully",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Add Enquiry error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Failed to add enquiry",
      error: error.message,
    });
  }
};

const viewEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryService.getAllEnquiries();
    return res.status(200).json({
      isResult: true,
      message: enquiries.length
        ? "Enquiries fetched successfully"
        : "No enquiries found",
      data: enquiries,
    });
  } catch (error) {
    console.error("View Enquiries error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryService.getEnquiryById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        isResult: false,
        message: "Enquiry not found",
      });
    }
    return res.status(200).json({
      isResult: true,
      message: "Enquiry fetched successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Get Enquiry error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Failed to fetch enquiry",
      error: error.message,
    });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await enquiryService.updateEnquiry(
      req.params.id,
      req.body
    );
    if (!updatedEnquiry) {
      return res.status(404).json({
        isResult: false,
        message: "Enquiry not found",
      });
    }
    return res.status(200).json({
      isResult: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.error("Update Enquiry error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Failed to update enquiry",
      error: error.message,
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await enquiryService.deleteEnquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        isResult: false,
        message: "Enquiry not found",
      });
    }
    return res.status(200).json({
      isResult: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Enquiry error:", error);
    return res.status(500).json({
      isResult: false,
      message: "Failed to delete enquiry",
      error: error.message,
    });
  }
};

module.exports = {
  addEnquiry,
  viewEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
