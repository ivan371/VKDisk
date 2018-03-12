import update from 'react-addons-update';
import { SET_FILTER, SET_SORT, SET_LINK } from '../actions/page';

const initalStore = {
    filter: '',
    sortSelect: '',
    filterSelect: '',
    link: {
        global: '',
        modal: '',
    },
};

export default function page(store = initalStore, action) {
    switch (action.type) {
        case SET_FILTER:
            return update(store, {
                filter: {
                    $set: action.filter,
                },
                filterSelect: {
                    $set: action.filterSelect,
                },
            });
        case SET_SORT:
            return update(store, {
                sort: {
                    $set: action.sortSelect,
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
        default:
            return store;
    }
}
