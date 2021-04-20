import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100),
  price: Joi.number()
    .required(),
  description: Joi.string()
    .max(100000),
  count: Joi.number()
    .integer(),
});
