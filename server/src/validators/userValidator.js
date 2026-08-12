const Joi = require("joi");

const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    email: Joi.string()
      .trim()
      .email()
      .max(150)
      .required(),

    password: Joi.string()
      .min(6)
      .max(128)
      .required(),
  }),

  params: Joi.object(),

  query: Joi.object(),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .max(150)
      .required(),

    password: Joi.string()
      .min(6)
      .max(128)
      .required(),
  }),

  params: Joi.object(),

  query: Joi.object(),
});

const profileUpdateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    email: Joi.string()
      .trim()
      .email()
      .max(150)
      .required(),
  }),

  params: Joi.object(),

  query: Joi.object(),
});

const changePasswordSchema = Joi.object({
  body: Joi.object({
    currentPassword: Joi.string()
      .min(6)
      .max(128)
      .required(),

    newPassword: Joi.string()
      .min(6)
      .max(128)
      .required(),
  }),

  params: Joi.object(),

  query: Joi.object(),
});

const updateUserSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    email: Joi.string()
      .trim()
      .email()
      .max(150)
      .optional(),
  }).min(1),

  params: Joi.object({
    id: Joi.string()
      .required(),
  }),

  query: Joi.object(),
});

module.exports = {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  changePasswordSchema,
  updateUserSchema,
};