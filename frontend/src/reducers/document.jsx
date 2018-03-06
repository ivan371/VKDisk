import update from 'react-addons-update';
import {
    CHECK_FILE, DOCS_BULK_CREATE_SUCCESS, DOCS_BULK_UPDATE, DOCS_BULK_UPDATE_SUCCESS, DOCS_UNMOUNT, LOAD_DOCS,
    LOAD_DOCS_MORE,
    LOAD_DOCS_SUCCESS,
} from '../actions/document';

const initalState = {
    isLoading: false,
    count: 0,
    page: 2,
    docs: {},
    docList: [],
    checkList: [],
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
    let index = null;
    let deleteList = [];
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
        case CHECK_FILE:
            index = store.checkList.indexOf(action.id);
            if (index === -1) {
                return update(store, {
                    checkList: {
                        $push: [action.id],
                    },
                });
            }

            return update(store, {
                checkList: {
                    $splice: [[index, 1]],
                },
            });
        case DOCS_BULK_UPDATE_SUCCESS:
            for (let i in store.checkList) {
                if (store.docList.indexOf(store.checkList[i]) !== -1) {
                    deleteList.push(i);
                }
            }
            return update(store, {
                docList: {
                    $splice: [[deleteList, deleteList.length]],
                },
                checkList: {
                    $set: [],
                },
            });
        case DOCS_BULK_CREATE_SUCCESS:
            return update(store, {
                checkList: {
                    $set: [],
                },
            });
        default:
            return store;
    }
}
