import update from 'react-addons-update';
import {LOAD_FOLDERS, LOAD_FOLDERS_SUCCESS} from "../actions/folder";

const initalState = {
    isLoading: false,
    count: 0,
    page: 2,
    folders: {},
    folderList: [],
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
        default:
            return store;
    }
}
