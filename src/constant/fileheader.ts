import Joi from '@hapi/joi'

export default {
    csvSchema: Joi.object({
        Domain: Joi.string().required().label('Domain should not be empty'),
        ParentCompany: Joi.string().required().label('parentcompany should not be empty'),
        Brand: Joi.string().required().label('brand should not be null'),
        Type: Joi.string().valid('Target', 'Competitor', 'Other'),
    }),
    testschema: Joi.object({
        Name: Joi.string().required(),
        Surname: Joi.string().required(),
        Age: Joi.string().required(),
    }),
}