import update from 'react-addons-update';
import {DOCS_UNMOUNT, LOAD_DOCS, LOAD_DOCS_MORE, LOAD_DOCS_SUCCESS} from "../actions/document";

const initalState = {
    isLoading: false,
    count: 0,
    page: 2,
    docs: {},
    docList: [],
};

export default function document(store = initalState, action) {
    if (action.hasOwnProperty('payload')) {
        if (action.payload !== undefined) {
            if (action.payload.hasOwnProperty('entities')) {
                if (action.payload.entities.hasOwnProperty('doc')) {
                    store = update(store, {
                        docs: {
                            $merge: action.payload.entities.doc,
                        },
                    });
                }
            }
        }
    }
    switch (action.type) {
        case LOAD_DOCS:
            return update(store, {
                isLoading: {
                    $set: false,
                },
            });
        case LOAD_DOCS_SUCCESS:
            return update(store, {
                isLoading: {
                    $set: true,
                },
                docList: {
                    $set: action.payload.result,
                },
                count: {
                    $set: action.payload.count,
                },
                page: {
                    $set: 2,
                },
            });
        case LOAD_DOCS_MORE:
            return update(store, {
                isLoading: {
                    $set: true,
                },
                docList: {
                    $push: action.payload.result,
                },
                count: {
                    $set: action.payload.count,
                },
                page: {
                    $set: store.page + 1,
                },
            });
        case DOCS_UNMOUNT:
            return update(store, {
                isLoading: {
                    $set: false,
                },
                docList: {
                    $set: [],
                },
            });
        default:
            return store;
    }
}
