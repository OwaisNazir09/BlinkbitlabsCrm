const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  otp: Joi.number().required(),

  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  bio: Joi.string().max(300).optional(),
  profilePic: Joi.string().uri().optional(),

  address: Joi.object({
    street: Joi.string().max(100).optional(),
    city: Joi.string().max(50).optional(),
    state: Joi.string().max(50).optional(),
    postalCode: Joi.string().max(20).optional(),
    country: Joi.string().max(50).optional(),
  }).optional(),

  dateOfBirth: Joi.date().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

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
  validateRegister: validate(registerSchema),
  validateLogin: validate(login),
};
