import { type NextFunction, type Request, type Response } from 'express';

import DirectusService from '@/services/directus.service';

class FeedController {
    private readonly service: DirectusService = new DirectusService();

    public getFeed = (req: Request, res: Response, next: NextFunction) => {
        const feedId = req.params.feed;

        this.service.getFeed(feedId).then((feed) => {
            res.status(200).send(feed);
        }).catch(next);
    };
}

export default FeedController;
