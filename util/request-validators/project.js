const Joi = require("@hapi/joi");

const schema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string()
    .uri()
    .required(),
  description: Joi.string().required(),
  skills: Joi.string().required()
});

module.exports = {
  schema
};
