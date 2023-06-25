import { Router } from 'express';

import { type Routes } from '@/interfaces/routes.interface';
import validate from '@/middlewares/validator.middleware';
import { feedFormatSchema, feedIdSchema } from '@/validators/feed.validator';
import FeedController from '@/controllers/feed.controller';
import { valid } from 'joi';

class FeedRoutes implements Routes {
    public path = '/feed';
    public router = Router();
    public tag = {
        name: 'Feed',
        description: 'Feed'
    };

    private readonly controller = new FeedController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        /**
         * @openapi
         * /v1/feed/{feed}:
         *   get:
         *     tags:
         *     - Feed
         *     summary: Get the feed
         *     parameters:
         *     - $ref: '#/components/parameters/format'
         *     - in: query
         *       name: feed
         *       description: The feed to get
         *       schema:
         *         type: string
         *     responses:
         *       200:
         *         description: The feed
         *       404:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/error'
         *       422:
         *         $ref: '#/components/responses/errorValidate'
         */
        this.router.get(
            `${this.path}/:feed`,
            validate(feedIdSchema, 'params'),
            validate(feedFormatSchema, 'query'),
            this.controller.getFeed
        );
    }
}

export default FeedRoutes;
