import update from 'react-addons-update';
import {
    CHECK_ALL,
    CHECK_FILE, DELETE_DOCS_SUCCESS, DOCS_BULK_CREATE_SUCCESS, DOCS_BULK_UPDATE, DOCS_BULK_UPDATE_SUCCESS, DOCS_UNMOUNT,
    LOAD_DOCS,
    LOAD_DOCS_MORE, LOAD_DOCS_MORE_START,
    LOAD_DOCS_SUCCESS, RENAME_DOC,
} from '../actions/document';
import _ from 'lodash';

const initalState = {
    isLoading: false,
    isLoadingMore: false,
    count: 0,
    page: 2,
    docs: {},
    docList: [],
    checkList: [],
    countCheck: 0,
    renamedId: null,
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
    switch (action.type) {
        case RENAME_DOC:
            if (store.renamedId) {
                return update(store, {
                    renamedId: {
                        $set: null,
                    },
                });
            }
            return update(store, {
                renamedId: {
                    $set: store.checkList[0],
                },
            });
        case LOAD_DOCS_MORE_START:
            return update(store, {
                isLoadingMore: {
                    $set: true,
                },
            });
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
                isLoadingMore: {
                    $set: false,
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
                    countCheck: {
                        $set: store.countCheck + 1,
                    },
                });
            }
            if (store.countCheck === 1) {
                return update(store, {
                    checkList: {
                        $set: [],
                    },
                    countCheck: {
                        $set: 0,
                    },
                });
            }
            return update(store, {
                checkList: {
                    $splice: [[index, 1]],
                },
                countCheck: {
                    $set: store.countCheck - 1,
                },
            });
        case CHECK_ALL:
            if (!store.checkList.length) {
                return update(store, {
                    checkList: {
                        $set: store.docList,
                    },
                    countCheck: {
                        $set: store.count,
                    },
                });
            }
            return update(store, {
                checkList: {
                    $set: [],
                },
                countCheck: {
                    $set: 0,
                },
            });

        case DOCS_BULK_UPDATE_SUCCESS:
            return update(store, {
                docList: {
                    $set: _.difference(store.docList, store.checkList),
                },
                checkList: {
                    $set: [],
                },
                countCheck: {
                    $set: 0,
                },
            });
        case DOCS_BULK_CREATE_SUCCESS:
            return update(store, {
                checkList: {
                    $set: [],
                },
                countCheck: {
                    $set: 0,
                },
            });
        case DELETE_DOCS_SUCCESS:
            index = store.docList.indexOf(action.payload.id);
            return update(store, {
                docList: {
                    $splice: [[index, 1]],
                },
            });
        default:
            return store;
    }
}
