import Joi from 'joi';

import { type IValidator } from '@/interfaces/validator.interface';

/**
 * @openapi
 * components:
 *   parameters:
 *     feedFormat:
 *       in: query
 *       name: format
 *       description: The format of the feed
 *       schema:
 *         type: string
 *         enum: [json, atom, rss]
 *         default: atom
 *         example: atom
 */
export const feedFormatSchema: IValidator = {
    joiSchema: Joi.object({
        format: Joi.string().valid('json', 'atom', 'rss').optional().default('atom')
    }),
    location: 'query'
};

/**
 * @openapi
 * components:
 *   parameters:
 *     feedId:
 *       in: query
 *       name: feed
 *       description: The feed to get
 *       schema:
 *         type: string
 */
export const feedIdSchema: IValidator = {
    joiSchema: Joi.object({
        feed: Joi.string().required()
    }),
    location: 'params'
};
