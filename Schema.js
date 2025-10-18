const Joi = require('joi');

const listingschema = Joi.object({
    listing:Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().required(),
    price:Joi.number().required().min(0),
    location:Joi.string().required(),
    country:Joi.string().allow("",null).required(),
}).required()})

module.exports = listingschema;