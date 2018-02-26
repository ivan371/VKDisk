import { apiLoad } from './load';
import { foldersNormalize } from '../normalizers/folder';

export const LOAD_FOLDERS = 'LOAD_FOLDERS';
export const LOAD_FOLDERS_SUCCESS = 'LOAD_FOLDERS_SUCCESS';
export const LOAD_FOLDERS_ERROR = 'LOAD_FOLDERS_ERROR';
export const LOAD_FILTER_FOLDERS = 'LOAD_FILTER_FOLDERS';
export const LOAD_FILTER_FOLDERS_SUCCESS = 'LOAD_FILTER_FOLDERS_SUCCESS';
export const LOAD_FILTER_FOLDERS_ERROR = 'LOAD_FILTER_FOLDERS_ERROR';


export function loadFolders(url) {
    const types = [LOAD_FOLDERS, LOAD_FOLDERS_SUCCESS, LOAD_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}

export function loadFilterFolders(url) {
    const types = [LOAD_FILTER_FOLDERS, LOAD_FILTER_FOLDERS_SUCCESS, LOAD_FILTER_FOLDERS_ERROR];
    return apiLoad(url, 'GET', types, null, foldersNormalize, false);
}
