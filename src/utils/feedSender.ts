import { type Request, type Response } from 'express';
import { type Feed } from 'feed';

/**
 * @openapi
 * components:
 *   parameters:
 *     format:
 *       in: query
 *       name: format
 *       description: The format of the feed
 *       schema:
 *         type: string
 *         enum: [json, atom, rss]
 *         default: atom
 *         example: atom
 */
class FeedSender {
    constructor (
        private readonly req: Request,
        private readonly res: Response
    ) { }

    public send (feed: Feed) {
        switch (this.req.query.format) {
            case 'json':
                this.res.set('Content-Type', 'application/json');
                this.res.status(200).send(feed.json1());
                return;
            case 'rss':
                this.res.set('Content-Type', 'application/rss+xml');
                this.res.status(200).send(feed.rss2());
                return;
            case 'atom':
            default:
                this.res.set('Content-Type', 'application/atom+xml');
                this.res.status(200).send(feed.atom1());
        }
    }

    public getFormat (): FeedFormat {
        switch (this.req.query.format) {
            case 'json':
            case 'rss':
            case 'atom':
                return this.req.query.format;
            default:
                return 'atom';
        }
    }
}

export type FeedFormat = 'json' | 'atom' | 'rss';

export default FeedSender;
