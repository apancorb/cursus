import Joi from "joi";

// function that validates the registration data given by a user
const registerValidation = (data) => {
  // schema that represents the registration data given by the user
  const schema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    university: Joi.string().min(3).required(),
  });

  // returns object with validated data
  return schema.validate(data);
};

// function that validates the login data given by a user
const loginValidation = (data) => {
  // schema that represents the login data given by the user
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  // returns object with validated data
  return schema.validate(data);
};

export { registerValidation, loginValidation };
