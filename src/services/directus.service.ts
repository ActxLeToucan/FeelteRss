import axios from 'axios';

import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import {
    type IDirectusDisplayableFeed,
    type IDirectusFeed,
    type IDirectusFeedFeed,
    type IDirectusFeedFilter,
    type IDirectusFeedGroup,
    type IDirectusFilter
} from '@/interfaces/directus.interface';

class DirectusService {
    private feeds: IDirectusFeed[] = [];
    private filters: IDirectusFilter[] = [];

    public async getFeed (url: string): Promise<IDirectusDisplayableFeed> {
        this.feeds = [];
        this.filters = [];

        const displayableFeeds = await this.getDirectusItems<IDirectusDisplayableFeed>('displayableFeeds', {
            'filter[status][_eq]': 'published',
            'filter[url][_eq]': url
        });
        if (displayableFeeds.length === 0) throw new HttpException(404, 'Feed not found');
        const displayableFeed = displayableFeeds[0];

        this.feeds = await this.getDirectusItems<IDirectusFeed>('feeds');
        this.filters = await this.getDirectusItems<IDirectusFilter>('filters');

        const feed = this.buildFeedTree(displayableFeed.feed);
        return {
            ...displayableFeed,
            feed
        };
    }

    private async getDirectusItems<Type> (collection: string, params: any = {}): Promise<Type[]> {
        if (DIRECTUS_URL == null) throw new HttpException(500, 'Directus URL not set');
        if (DIRECTUS_TOKEN == null) throw new HttpException(500, 'Directus token not set');

        return axios({
            method: 'get',
            url: `${DIRECTUS_URL}/items/${collection}`,
            params,
            headers: {
                Authorization: `Bearer ${DIRECTUS_TOKEN}`
            }
        }).then(response => response.data.data as Type[]);
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
                const groupChildren = (feedGroup.groupChildren as number[]).map(this.buildFeedTree.bind(this));
                return {
                    ...feedGroup,
                    groupChildren
                };
            }
            case 'filter': {
                const feedFilter = (feed as IDirectusFeedFilter);
                const filterChild = this.buildFeedTree(feedFilter.filterChild);
                const filter = this.filters.find(filter => filter.id === feedFilter.filter);
                if (filter === undefined) throw new HttpException(500, 'Filter not found');
                return {
                    ...feedFilter,
                    filterChild,
                    filter
                };
            }
        }
    }
}

export default DirectusService;
