export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';

export function setFilter(filter, filterSelect) {
    return {
        type: SET_FILTER,
        filterSelect,
        filter,
    };
}

export function setSort(sort, sortSelect) {
    return {
        types: SET_SORT,
        sortSelect,
    };
}
