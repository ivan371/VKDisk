import {apiLoad} from './load';

export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LINK = 'SET_LINK';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const SORT_DIRECTION = 'SORT_DIRECTION';
export const SET_ELASTIC = 'SET_ELASTIC';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const SWITCH_LANG = 'SWITCH_LANG';
export const LOAD_LANG = 'LOAD_LANG';


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

export function setElastic() {
    return {
        type: SET_ELASTIC,
    }
}

export function loadLang(url, lang) {
    const types = [LOAD_USER, LOAD_LANG, LOAD_USER_ERROR];
    return apiLoad(url, 'PUT', types, JSON.stringify({lang}), c => c, true);
}

export function switchLang(lang) {
    return {
        type: SWITCH_LANG,
        lang,
    }
}


export function loadUser(url) {
    const types = [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR];
    return apiLoad(url, 'GET', types, null, c => c, true);
}