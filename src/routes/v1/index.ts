import { Router } from 'express';
import { type Tag } from 'swagger-jsdoc';

import { type Routes } from '@/interfaces/routes.interface';
import DocsRoutes from '@/routes/docs.routes';
import FeedRoutes from '@/routes/v1/feed.routes';

class RouterV1 implements Routes {
    public path = '/v1';
    public router = Router();
    public version = '1.0.0';

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        const feedRoutes = new FeedRoutes();
        this.router.use(`${this.path}`, feedRoutes.router);

        const tags: Tag[] = [
            feedRoutes.tag
        ];

        this.router.use(`${this.path}`, new DocsRoutes(this.version, 'v1', tags).router);
    }
}

export default RouterV1;
