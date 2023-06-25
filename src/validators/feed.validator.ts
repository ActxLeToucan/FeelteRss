import Joi from 'joi';

export const feedFormatSchema = Joi.object({
    format: Joi.string().valid('json', 'atom', 'rss').optional().default('atom')
});

export const feedIdSchema = Joi.object({
    feed: Joi.string().required()
});
