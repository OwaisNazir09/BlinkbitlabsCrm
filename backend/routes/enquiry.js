const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const enquiryController = require("../controller/enquiryController");
const {
  validateCreateEnquiry,
  validateUpdateEnquiry,
} = require("../validators/enquiryValidator");

router.use(auth);
router.post("/add", validateCreateEnquiry, enquiryController.addEnquiry);
router.get("/", enquiryController.viewEnquiries);
router.get("/:id", enquiryController.getEnquiryById);
router.put("/:id", validateUpdateEnquiry, enquiryController.updateEnquiry);
router.delete("/:id", enquiryController.deleteEnquiry);

module.exports = router;
