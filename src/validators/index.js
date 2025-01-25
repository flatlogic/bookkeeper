import Joi from '@hapi/joi';

export const phone = Joi.string()
  .pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
  .allow(null, '')
  .message('Phone is not valid');

export const address = Joi.object({
  street: Joi.string()
    .required(),
  city: Joi.string()
    .required(),
  state: Joi.string()
    .required(),
  zipCode: Joi.string()
    .length(5)
    .required(),
  phone,
});