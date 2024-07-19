const Joi = require('joi');

const validateRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  validateRegister,
  validateLogin,
};
