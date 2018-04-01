import { apiLoad } from './load';
import { folderNormalize, folderRecursiveNormalize, foldersNormalize } from '../normalizers/folder';

export const LOAD_FOLDERS = 'LOAD_FOLDERS';
export const LOAD_FOLDERS_SUCCESS = 'LOAD_FOLDERS_SUCCESS';
export const LOAD_RECURSIVE_FOLDERS = 'LOAD_RECURSIVE_FOLDERS';
export const LOAD_RECURSIVE_FOLDERS_SUCCESS = 'LOAD_RECURSIVE_FOLDERS_SUCCESS';
export const LOAD_FOLDERS_TRANSFER = 'LOAD_FOLDERS_TRANSFER';
export const LOAD_FOLDERS_TRANSFER_SUCCESS = 'LOAD_FOLDERS_TRANSFER_SUCCESS';
export const LOAD_FOLDERS_ERROR = 'LOAD_FOLDERS_ERROR';
export const LOAD_FILTER_FOLDERS = 'LOAD_FILTER_FOLDERS';
export const LOAD_FILTER_FOLDERS_SUCCESS = 'LOAD_FILTER_FOLDERS_SUCCESS';
export const LOAD_FILTER_FOLDERS_ERROR = 'LOAD_FILTER_FOLDERS_ERROR';
export const LOAD_FOLDER = 'LOAD_FOLDER';
export const LOAD_FOLDER_SUCCESS = 'LOAD_FOLDER_SUCCESS';
export const LOAD_FOLDER_ERROR = 'LOAD_FOLDER_ERROR';
export const FOLDER_CREATE = 'FOLDER_CREATE';
export const FOLDER_UPDATE = 'FOLDER_UPDATE';
export const SWITCH_FOLDER = 'SWITCH_FOLDER';
export const FOLDER_UNMOUNT = 'FOLDER_UNMOUNT';
export const LOAD_FOLDERS_MORE = 'LOAD_FOLDERS_MORE';
export const LOAD_FOLDERS_MORE_START = 'LOAD_FOLDERS_MORE_START';
export const TRANSFER_UNMOUNT = 'TRANSFER_UNMOUNT';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';
export const DELETE_FOLDER_ERROR = 'DELETE_FOLDER_ERROR';
export const FILTER_FOLDERS = 'FILTER_FOLDERS';
export const LOAD_UNTREE_FOLDERS_SUCCESS = 'LOAD_UNTREE_FOLDERS_SUCCESS';
export const LOAD_ROOT = 'LOAD_ROOT';
export const CHECK_FOLDER = 'CHECK_FOLDER';
export const CHECK_ALL_FOLDERS = 'CHECK_ALL_FOLDERS';
export const RENAME_FOLDER = 'RENAME_FOLDER';

export function renameFolder() {
    return {
        type: RENAME_FOLDER,
    };
}

export function checkFolder(id) {
    return {
        type: CHECK_FOLDER,
        id,
    };
}

export function checkAllFolders() {
    return {
        type: CHECK_ALL_FOLDERS,
    };
}


export function loadFolders(url) {
    const types = [LOAD_FOLDERS, LOAD_FOLDERS_SUCCESS, LOAD_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function loadRoot() {
    return {
        type: LOAD_ROOT,
    };
}

export function loadUnTreeFolders(url) {
    const types = [LOAD_FOLDERS, LOAD_UNTREE_FOLDERS_SUCCESS, LOAD_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function filterFolders(id) {
    return {
        type: FILTER_FOLDERS,
        id,
    };
}

export function loadRecursiveFolders(url) {
    const types = [LOAD_RECURSIVE_FOLDERS, LOAD_RECURSIVE_FOLDERS_SUCCESS, LOAD_FOLDER_ERROR];
    return apiLoad(url, 'GET', types, null, folderRecursiveNormalize, true);
}

export function loadFoldersMore(url) {
    const types = [LOAD_FOLDERS_MORE_START, LOAD_FOLDERS_MORE, LOAD_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function updateFolderRoot(url, root) {
    const types = [DELETE_FOLDER, DELETE_FOLDER_SUCCESS, DELETE_FOLDER_ERROR];
    return apiLoad(url, 'PUT', types, JSON.stringify({ root }), a => a, true);
}

export function loadTransferFolders(url) {
    const types = [LOAD_FOLDERS_TRANSFER, LOAD_FOLDERS_TRANSFER_SUCCESS, LOAD_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function loadFilterFolders(url) {
    const types = [LOAD_FILTER_FOLDERS, LOAD_FILTER_FOLDERS_SUCCESS, LOAD_FILTER_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function createFolder(url, title) {
    const types = [LOAD_FOLDER, FOLDER_CREATE, LOAD_FOLDER_ERROR];
    return apiLoad(url, 'POST', types, JSON.stringify({ title }), folderNormalize, true);
}

export function updateFolder(url, title) {
    const types = [LOAD_FOLDER, FOLDER_UPDATE, LOAD_FOLDER_ERROR];
    return apiLoad(url, 'PUT', types, JSON.stringify({ title }), folderNormalize, true);
}

export function switchFolder(id) {
    return {
        type: SWITCH_FOLDER,
        id,
    };
}

export function folderUnMount() {
    return {
        type: FOLDER_UNMOUNT,
    };
}

export function transferUnMount() {
    return {
        type: TRANSFER_UNMOUNT,
    };
}
