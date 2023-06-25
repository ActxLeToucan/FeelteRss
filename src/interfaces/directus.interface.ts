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
    groupChildren: IDirectusFeed[] | number[]
    filterChild: IDirectusFeed | number | null
    filter: IDirectusFilter | number | null
    feedUrl: string | null
}

export interface IDirectusFeedGroup extends IDirectusFeed {
    type: 'group'
    groupChildren: IDirectusFeed[] | number[]
}

export interface IDirectusFeedFilter extends IDirectusFeed {
    type: 'filter'
    filterChild: IDirectusFeed | number
    filter: IDirectusFilter | number
}

export interface IDirectusFeedFeed extends IDirectusFeed {
    type: 'feed'
    feedUrl: string
}

export interface IDirectusFilter {
    id: number
    name: string
    type: 'contains' | 'equals' | 'regex'
    field: 'content' | 'link' | 'title' | 'author'
    values: string[]
    caseSensitive: boolean
    behaviour: 'oneOrMore' | 'all' | null
    keep: boolean
}
