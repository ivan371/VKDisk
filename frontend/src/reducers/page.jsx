import update from 'react-addons-update';
import {
    SET_FILTER, SET_SORT, SET_LINK, CHANGE_VIEW, CLEAR_FILTER, SORT_DIRECTION, SET_ELASTIC,
    LOAD_USER_SUCCESS, SWITCH_LANG, LOAD_USER
} from '../actions/page';
import { view } from '../constants';

const initalStore = {
    filter: {
        folder: '',
        docs: '',
    },
    sort: {
        folder: {
            name: 'created',
            isDirect: true
        },
        docs: {
            name: 'created',
            isDirect: true,
        },
    },
    filterSelect: {
        folder: 'name',
        docs: 'name',
    },
    link: {
        global: '',
        modal: '',
    },
    isElastic: false,
    view: view.row,
    lang: 'en',
    id: null,
    user: {},
    isLoading: true,
};

export default function page(store = initalStore, action) {
    switch (action.type) {
        case SET_FILTER:
            return update(store, {
                filter: {
                    [action.app]: {
                        $set: action.filter,
                    },
                },
                filterSelect: {
                    [action.app]: {
                        $set: action.filterSelect,
                    },
                },
            });
        case CLEAR_FILTER:
            return update(store, {
                filter: {
                    [action.app]: {
                        $set: '',
                    },
                },
                filterSelect: {
                    [action.app]: {
                        $set: '',
                    },
                },
            });
        case SORT_DIRECTION:
            return update(store, {
                sort: {
                    [action.app]: {
                        isDirect: {
                            $set: !store.sort[action.app].isDirect,
                        },
                    },
                },
            });
        case SET_SORT:
            return update(store, {
                sort: {
                    [action.app]: {
                        name: {
                            $set: action.sort,
                        },
                        isDirect: {
                            $set: true,
                        }
                    },
                },
            });
        case SET_LINK:
            return update(store, {
                link: {
                    [action.app]: {
                        $set: action.link,
                    },
                },
            });
        case CHANGE_VIEW:
            if (store.view === view.row) {
                return update(store, {
                    view: {
                        $set: view.col,
                    },
                });
            }
            return update(store, {
                view: {
                    $set: view.row,
                },
            });
        case SET_ELASTIC:
            return update(store, {
                isElastic: {
                    $set: !store.isElastic
                },
            });
        case SWITCH_LANG: {
            return update(store, {
                lang: {
                    $set: action.lang,
                },
            });
        }
        case LOAD_USER: {
            return update(store, {
                isLoading: {
                    $set: true,
                }
            })
        }
        case LOAD_USER_SUCCESS: {
            return update(store, {
                lang: {
                    $set: action.payload.lang,
                },
                id: {
                    $set: action.payload.id,
                },
                user: {
                    $set: action.payload,
                },
                isLoading: {
                    $set: false,
                }
            });
        }
        default:
            return store;
    }
}
