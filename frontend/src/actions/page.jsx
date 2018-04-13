export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LINK = 'SET_LINK';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const SORT_DIRECTION = 'SORT_DIRECTION';

export function setFilter(filter, filterSelect, app) {
    return {
        type: SET_FILTER,
        filterSelect,
        filter,
        app,
    };
}

export function clearFilter(app) {
    return {
        type: CLEAR_FILTER,
        app,
    };
}

export function setSort(sort, app) {
    return {
        type: SET_SORT,
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

export function changeView() {
    return {
        type: CHANGE_VIEW,
    };
}

export function changeSortDirection(app) {
    return {
        type: SORT_DIRECTION,
        app,
    };
}