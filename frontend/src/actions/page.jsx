export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LINK = 'SET_LINK';

export function setFilter(filter, filterSelect, app) {
    return {
        type: SET_FILTER,
        filterSelect,
        filter,
        app,
    };
}

export function setSort(sort, sortSelect, app) {
    return {
        type: SET_SORT,
        sortSelect,
        app,
        sort,
    };
}

export function setLink(link, app) {
    return {
        type: SET_LINK,
        link,
        app,
    };
}
