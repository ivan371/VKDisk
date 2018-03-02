import update from 'react-addons-update';
import {
    FOLDER_CREATE,
    LOAD_FILTER_FOLDERS, LOAD_FILTER_FOLDERS_SUCCESS, LOAD_FOLDER, LOAD_FOLDERS,
    LOAD_FOLDERS_SUCCESS,
} from '../actions/folder';

const initalState = {
    isLoading: false,
    isTileLoading: false,
    isOwnFolderLoading: false,
    count: 0,
    page: 2,
    folders: {},
    folderList: [],
    folderTileList: [],
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
        default:
            return store;
    }
}
