export interface IDirectusDisplayableFeed {
    id: number
    status: 'published' | 'draft' | 'archived'
    url: string
    title: string
    description: string
    feed: IDirectusFeed | number | null
}

export interface IDirectusFeed {
    id: number
    name: string
    type: 'group' | 'filter' | 'feed'
    groupChildren: IDirectusFeed[] | IDirectusRelationGroupFeed[]
    filterChild: IDirectusFeed | number | null
    filter: IDirectusFilter | null
    feedUrl: string | null
}

export interface IDirectusFeedGroup extends IDirectusFeed {
    type: 'group'
    groupChildren: IDirectusFeed[] | IDirectusRelationGroupFeed[]
}

export interface IDirectusFeedFilter extends IDirectusFeed {
    type: 'filter'
    filterChild: IDirectusFeed | number
    filter: IDirectusFilter
}

export interface IDirectusFeedFeed extends IDirectusFeed {
    type: 'feed'
    feedUrl: string
}

export interface IDirectusRelationGroupFeed {
    id: number
    feeds_id: number
    related_feeds_id: number
}

export interface IDirectusFilter {
    id: number
    name: string
    type: 'contains' | 'equals' | 'regex'
    field: 'content' | 'link' | 'title'
    values: string[] | null
    caseSensitive: boolean
    behaviour: 'oneOrMore' | 'all' | null
    keep: boolean
}
