import update from 'react-addons-update';
import _ from 'lodash';
import {
    FOLDER_CREATE, FOLDER_UNMOUNT,
    LOAD_FILTER_FOLDERS, LOAD_FILTER_FOLDERS_SUCCESS, LOAD_FOLDER, LOAD_FOLDERS, LOAD_FOLDERS_MORE,
    LOAD_FOLDERS_SUCCESS, LOAD_FOLDERS_TRANSFER, LOAD_FOLDERS_TRANSFER_SUCCESS, SWITCH_FOLDER, TRANSFER_UNMOUNT,
    LOAD_FOLDERS_MORE_START, ROOT_FOLDER_SUCCESS, FILTER_FOLDERS, LOAD_RECURSIVE_FOLDERS,
    LOAD_RECURSIVE_FOLDERS_SUCCESS, LOAD_UNTREE_FOLDERS_SUCCESS, LOAD_ROOT, CHECK_FOLDER, CHECK_ALL_FOLDERS,
    RENAME_FOLDER, DELETE_FOLDER_SUCCESS,
} from '../actions/folder';
import {DOCS_UNMOUNT, LOAD_CHAT_ROOT} from '../actions/document';
import { folderType } from '../constants';

const initalState = {
    isLoading: false,
    isLoadingMore: false,
    isTileLoading: false,
    isTransferLoading: false,
    isOwnFolderLoading: false,
    isRecursiveLoading: false,
    count: 0,
    page: 2,
    folders: {},
    foldersRecursiveList: [],
    folderList: [],
    folderTileList: [],
    folderTransferList: [],
    folderUnTreeList: [],
    checkedFolder: null,
    recursiveFolder: null,
    checkList: [],
    countCheck: 0,
    renamedId: null,
};

function filter(folders, id) {
    const keys = [];
    for (const i in folders) {
        if (folders[i].root != id || folders[i].type === folderType.chat) {
            keys.push(folders[i].id);
        }
    }
    return keys;
}

function filterRoot(folders) {
    const keys = [];
    for (const i in folders) {
        if (folders[i].root !== null || folders[i].type === folderType.chat) {
            keys.push(folders[i].id);
        }
    }
    return keys;
}

export default function folder(store = initalState, action) {
    if (action.hasOwnProperty('payload')) {
        if (action.payload !== undefined) {
            if (action.payload.hasOwnProperty('entities')) {
                if (action.payload.entities.hasOwnProperty('folder') && action.type !== LOAD_RECURSIVE_FOLDERS_SUCCESS) {
                    store = update(store, {
                        folders: {
                            $merge: action.payload.entities.folder,
                        },
                    });
                }
            }
        }
    }
    let index = null;
    switch (action.type) {
        case RENAME_FOLDER:
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
        case LOAD_ROOT:
            return update(store, {
                foldersRecursiveList: {
                    $set: [],
                },
                folderTileList: {
                    $set: store.folderList,
                }
            });
        case LOAD_RECURSIVE_FOLDERS:
            return update(store, {
                isRecursiveLoading: {
                    $set: false,
                },
                isLoading: {
                    $set: false,
                },
            });
        case LOAD_RECURSIVE_FOLDERS_SUCCESS:
            return update(store, {
                isRecursiveLoading: {
                    $set: true,
                },
                isLoading: {
                    $set: true,
                },
                foldersRecursiveList: {
                    $set: Object.keys(action.payload.entities.folder).map(id => parseInt(id)),
                },
                recursiveFolder: {
                    $set: action.payload.result,
                },
            });
        case FILTER_FOLDERS:
            return update(store, {
                folderTileList: {
                    $set: _.difference(Object.keys(store.folders)
                        .map(id => parseInt(id)) || {}, filter(store.folders, action.id)),
                },
                folderList: {
                    $set: _.difference(Object.keys(store.folders)
                        .map(id => parseInt(id)) || {}, filterRoot(store.folders, action.id)),
                },
                isLoading: {
                    $set: true,
                },
            });
        case LOAD_FOLDERS:
            return update(store, {
                isLoading: {
                    $set: false,
                },
            });
        case LOAD_UNTREE_FOLDERS_SUCCESS:
            return update(store, {
                isLoading: {
                    $set: true,
                },
                folderUnTreeList: {
                    $set: action.payload.result,
                },
                folderTileList: {
                    $set: [],
                },
                count: {
                    $set: action.payload.count,
                },
                page: {
                    $set: 2,
                },
            });
        case LOAD_FOLDERS_SUCCESS:
            return update(store, {
                isLoading: {
                    $set: true,
                },
                folderList: {
                    $set: action.payload.result,
                },
                count: {
                    $set: action.payload.count,
                },
                page: {
                    $set: 2,
                },
            });
        case LOAD_FOLDERS_MORE_START:
            return update(store, {
                isLoadingMore: {
                    $set: true,
                },
            });
        case LOAD_FOLDERS_MORE:
            return update(store, {
                isLoading: {
                    $set: true,
                },
                folderUnTreeList: {
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
        case LOAD_FOLDERS_TRANSFER:
            return update(store, {
                isTransferLoading: {
                    $set: false,
                },
            });
        case LOAD_FOLDERS_TRANSFER_SUCCESS:
            return update(store, {
                isTransferLoading: {
                    $set: true,
                },
                folderTransferList: {
                    $set: action.payload.result,
                },
            });
        case LOAD_FOLDER:
            return update(store, {
                isOwnLoading: {
                    $set: false,
                },
            });
        case FOLDER_CREATE:
            if (action.payload.entities.folder[action.payload.result].root) {
                store = update(store, {
                    folders: {
                        [action.payload.entities.folder[action.payload.result].root]: {
                            folder_set: {
                                $unshift: [action.payload.result],
                            },
                        },
                    },
                });
            } else {
                store = update(store, {
                    folderList: {
                        $unshift: [action.payload.result],
                    },
                });
            }
            return update(store, {
                isOwnLoading: {
                    $set: true,
                },
                folderTileList: {
                    $unshift: [action.payload.result],
                },
            });
        case LOAD_FILTER_FOLDERS:
            return update(store, {
                isTileLoading: {
                    $set: false,
                },
            });
        case LOAD_FILTER_FOLDERS_SUCCESS:
            return update(store, {
                isTileLoading: {
                    $set: true,
                },
                folderTileList: {
                    $set: action.payload.result,
                },
            });
        case DOCS_UNMOUNT:
            return update(store, {
                // isTileLoading: {
                //     $set: false,
                // },
                // folderTileList: {
                //     $set: [],
                // },
                checkList: {
                    $set: [],
                },
                countCheck: {
                    $set: 0,
                },
            });
        case SWITCH_FOLDER:
            return update(store, {
                checkedFolder: {
                    $set: action.id,
                },
            });
        case FOLDER_UNMOUNT:
            return update(store, {
                // isLoading: {
                //     $set: false,
                // },
                // folderList: {
                //     $set: [],
                // },
            });
        case LOAD_CHAT_ROOT:
            return update(store, {
                isTileLoading: {
                    $set: false,
                }
            });
        case TRANSFER_UNMOUNT:
            return update(store, {
                checkedFolder: {
                    $set: null,
                },
            });
        case ROOT_FOLDER_SUCCESS:
            index = store.folderTileList.indexOf(action.payload.id);
            return update(store, {
                folderTileList: {
                    $splice: [[index, 1]],
                },
            });
        case DELETE_FOLDER_SUCCESS:
            index = store.folderTileList.indexOf(action.payload.id);
            if (action.payload.root) {
                store = update(store, {
                    folders: {
                        [action.payload.root]: {
                            folder_set: {
                                $splice: [[index, 1]],
                            },
                        },
                    },
                });
            } else {
                store = update(store, {
                    folderList: {
                        $splice: [[index, 1]],
                    },
                });
                delete store.folders[action.payload.id];
            }
            return update(store, {
                folderTileList: {
                    $splice: [[index, 1]],
                },
            });
        case CHECK_FOLDER:
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
        case CHECK_ALL_FOLDERS:
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
        default:
            return store;
    }
}
