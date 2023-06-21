import { Router } from 'express';

import { type Routes } from '@/interfaces/routes.interface';
import DocsRoutes from '@/routes/docs.routes';
import { type Tag } from 'swagger-jsdoc';

class RouterV1 implements Routes {
    public path = '/v1';
    public router = Router();
    public version = '1.0.0';

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        const tags: Tag[] = [];

        this.router.use(`${this.path}`, new DocsRoutes(this.version, 'v1', tags).router);
    }
}

export default RouterV1;
