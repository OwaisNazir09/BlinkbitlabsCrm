const Joi = require("joi");

const createEnquirySchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  street: Joi.string().max(100).allow("").optional(),
  city: Joi.string().max(50).allow("").optional(),
  state: Joi.string().max(50).allow("").optional(),
  country: Joi.string().max(50).allow("").optional(),
  postalCode: Joi.string().max(20).allow("").optional(),
  company: Joi.string().max(100).allow("").optional(),
  position: Joi.string().max(100).allow("").optional(),
  website: Joi.string().uri().allow("").optional(),
  notes: Joi.string().max(500).allow("").optional(),
  status: Joi.string().valid("Active", "Inactive", "Prospect").optional(),
});

const updateEnquirySchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  location: Joi.string().max(100).optional(),
  message: Joi.string().max(500).optional(),
  status: Joi.string().valid("Pending", "In Progress", "Completed").optional(),
}).min(1);

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      isResult: false,
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  validateCreateEnquiry: validate(createEnquirySchema),
  validateUpdateEnquiry: validate(updateEnquirySchema),
};
