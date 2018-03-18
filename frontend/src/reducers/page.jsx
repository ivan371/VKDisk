import update from 'react-addons-update';
import { SET_FILTER, SET_SORT, SET_LINK, CHANGE_VIEW } from '../actions/page';
import { view } from '../constants';

const initalStore = {
    filter: {
        folder: '',
        docs: '',
    },
    sortSelect: {
        folder: '',
        docs: '',
    },
    filterSelect: {
        folder: 'name',
        docs: 'name',
    },
    link: {
        global: '',
        modal: '',
    },
    view: view.row,
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
        case SET_SORT:
            return update(store, {
                sort: {
                    [action.app]: {
                        $set: action.sortSelect,
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
        default:
            return store;
    }
}
