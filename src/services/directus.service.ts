import axios from 'axios';

import { DIRECTUS_TOKEN, DIRECTUS_URL } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import {
    type IDirectusDisplayableFeed,
    type IDirectusFeed,
    type IDirectusFeedFeed,
    type IDirectusFeedFilter,
    type IDirectusFeedGroup,
    type IDirectusRelationGroupFeed
} from '@/interfaces/directus.interface';
import { logger } from '@/utils/logger';

class DirectusService {
    private feeds: IDirectusFeed[] = [];

    public async getFeed (url: string): Promise<IDirectusDisplayableFeed> {
        this.feeds = [];

        logger.info(`Getting feed for ${url}`);
        const displayableFeeds = await this.getDirectusItems<IDirectusDisplayableFeed>('displayableFeeds', {
            'filter[status][_eq]': 'published',
            'filter[url][_eq]': url
        });
        if (displayableFeeds.length === 0) throw new HttpException(404, 'Feed not found');
        const displayableFeed = displayableFeeds[0];

        this.feeds = await this.getDirectusItems<IDirectusFeed>('feeds', {
            fields: '*.*'
        });

        const feed = this.buildFeedTree(displayableFeed.feed);
        return {
            ...displayableFeed,
            feed
        };
    }

    private async getDirectusItems<Type> (collection: string, params: any = {}): Promise<Type[]> {
        if (DIRECTUS_URL == null) throw new HttpException(500, 'Directus URL not set');
        if (DIRECTUS_TOKEN == null) throw new HttpException(500, 'Directus token not set');

        const response = await axios({
            method: 'get',
            url: `${DIRECTUS_URL}/items/${collection}`,
            params,
            headers: {
                Authorization: `Bearer ${DIRECTUS_TOKEN}`
            }
        });
        return response.data.data as Type[];
    }

    private buildFeedTree (feedOrId: IDirectusFeed | number | null): IDirectusFeed {
        if (feedOrId == null) throw new HttpException(500, 'Invalid feed');

        const feed = (typeof feedOrId === 'number')
            ? this.feeds.find(feed => feed.id === feedOrId)
            : feedOrId;
        if (feed === undefined) throw new HttpException(500, 'Feed not found');

        switch (feed.type) {
        case 'feed': {
            return feed as IDirectusFeedFeed;
        }
        case 'group': {
            const feedGroup = (feed as IDirectusFeedGroup);
            const groupChildren = (feedGroup.groupChildren as IDirectusRelationGroupFeed[])
                .map(relation => this.buildFeedTree(relation.related_feeds_id));
            return {
                ...feedGroup,
                groupChildren
            };
        }
        case 'filter': {
            const feedFilter = (feed as IDirectusFeedFilter);
            const filterChild = this.buildFeedTree(feedFilter.filterChild);
            return {
                ...feedFilter,
                filterChild
            };
        }
        }
    }
}

export default DirectusService;
