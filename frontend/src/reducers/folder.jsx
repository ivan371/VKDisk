import update from 'react-addons-update';
import {
    FOLDER_CREATE, FOLDER_UNMOUNT,
    LOAD_FILTER_FOLDERS, LOAD_FILTER_FOLDERS_SUCCESS, LOAD_FOLDER, LOAD_FOLDERS,
    LOAD_FOLDERS_SUCCESS, LOAD_FOLDERS_TRANSFER, LOAD_FOLDERS_TRANSFER_SUCCESS, SWITCH_FOLDER,
} from '../actions/folder';
import { DOCS_UNMOUNT } from '../actions/document';

const initalState = {
    isLoading: false,
    isTileLoading: false,
    isTransferLoading: false,
    isOwnFolderLoading: false,
    count: 0,
    page: 2,
    folders: {},
    folderList: [],
    folderTileList: [],
    folderTransferList: [],
    checkedFolder: null,
};

export default function folder(store = initalState, action) {
    if (action.hasOwnProperty('payload')) {
        if (action.payload !== undefined) {
            if (action.payload.hasOwnProperty('entities')) {
                if (action.payload.entities.hasOwnProperty('folder')) {
                    store = update(store, {
                        folders: {
                            $merge: action.payload.entities.folder,
                        },
                    });
                }
            }
        }
    }
    switch (action.type) {
        case LOAD_FOLDERS:
            return update(store, {
                isLoading: {
                    $set: false,
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
                isTileLoading: {
                    $set: false,
                },
                folderTileList: {
                    $set: [],
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
                isLoading: {
                    $set: false,
                },
            });
        default:
            return store;
    }
}
