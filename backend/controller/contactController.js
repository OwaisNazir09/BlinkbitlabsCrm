const { sendContactMail } = require("../utils/nodemailer");
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("New Contact Message:", { name, email, subject, message });

    try {
      await sendContactMail({ name, email, subject, message });
    } catch (err) {
      console.error("Mail error:", err);
    }
    return res.status(200).json({
      success: true,
      message: "Your message has been received successfully!",
    });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { submitContactForm };
