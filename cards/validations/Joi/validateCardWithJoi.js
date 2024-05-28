const Joi = require("joi");

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .message('card "phone" must be a valid phone number')
    .required(),
  email: Joi.string()
    .pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .message('card "email" must be a valid email')
    .required(),
  web: Joi.string()
    .pattern(urlRegex)
    .message('card "web" must be a valid url')
    .allow(""),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .pattern(urlRegex)
        .message('card.image "url" must be a valid url')
        .allow(""),
      alt: Joi.string().min(2).max(256).allow(""),
    })
    .required(),
  address: Joi.object()
    .keys({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number(),
    })
    .required(),
  bizNumber: Joi.number().allow(""),
  user_id: Joi.string().allow(""),
});

const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).optional(),
  subtitle: Joi.string().min(2).max(256).optional(),
  description: Joi.string().min(2).max(1024).optional(),
  phone: Joi.string()
    .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .message('card "phone" must be a valid phone number')
    .optional(),
  email: Joi.string()
    .pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .message('card "email" must be a valid email')
    .optional(),
  web: Joi.string()
    .pattern(urlRegex)
    .message('card "web" must be a valid url')
    .allow("")
    .optional(),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .pattern(urlRegex)
        .message('card.image "url" must be a valid url')
        .allow("")
        .optional(),
      alt: Joi.string().min(2).max(256).allow("").optional(),
    })
    .optional(),
  address: Joi.object()
    .keys({
      state: Joi.string().allow("").optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
      street: Joi.string().optional(),
      houseNumber: Joi.number().optional(),
      zip: Joi.number().optional(),
    })
    .optional(),
  bizNumber: Joi.number().allow("").optional(),
  user_id: Joi.string().allow("").optional(),
});

const validateCardCreation = (card) => createCardSchema.validate(card);
const validateCardUpdate = (card) => updateCardSchema.validate(card);

module.exports = {
  validateCardCreation,
  validateCardUpdate,
};
