import Joi from '@hapi/joi';

export const availableToUse = joi => ({
  type: 'availableToUse',
  base: joi.string(),
  messages: {
    'availableUse.base': '"{{#label}}" already in use',
  },
  coerce(value, helpers) {
    if (helpers.schema.$_getRule('round')) {
      return { value: Math.round(value) };
    }
  },
  validate(value, helpers) {
    if (value === 'used') {
      return { value, errors: helpers.error('availableUse.base') };
    }
  },
  rules: [{
    name: 'availableToUse',
    validate(params, value, state, options) {
      if (value === 'used') {
        return { value, errors: '!!!!' };
      } else {
        return value;
      }
    }
  }]
});