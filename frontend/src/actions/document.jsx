import { apiLoad } from './load';
import {docNormalize, docsNormalize} from '../normalizers/document';

export const LOAD_DOCS = 'LOAD_DOCS';
export const LOAD_DOCS_SUCCESS = 'LOAD_DOCS_SUCCESS';
export const LOAD_DOCS_MORE = 'LOAD_DOCS_MORE';
export const LOAD_DOCS_ERROR = 'LOAD_DOCS_ERROR';
export const DOCS_UNMOUNT = 'DOCS_UNMOUNT';
export const LOAD_DOC = 'LOAD_DOC';
export const LOAD_DOC_ERROR = 'LOAD_DOC_ERROR';
export const UPDATE_DOC = 'UPDATE_DOC';
export const CHECK_FILE = 'CHECK_FILE';
export const DOCS_BULK_CREATE = 'DOCS_BULK_CREATE';
export const DOCS_BULK_CREATE_SUCCESS = 'DOCS_BULK_CREATE_SUCCESS';

export function loadDocs(url) {
    const types = [LOAD_DOCS, LOAD_DOCS_SUCCESS, LOAD_DOCS_ERROR];
    return apiLoad(url, 'GET', types, null, docsNormalize, false);
}

export function loadDocsMore(url) {
    const types = [LOAD_DOCS, LOAD_DOCS_MORE, LOAD_DOCS_ERROR];
    return apiLoad(url, 'GET', types, null, docsNormalize, false);
}

export function updateDoc(url, title) {
    const types = [LOAD_DOC, UPDATE_DOC, LOAD_DOC_ERROR];
    return apiLoad(url, 'PUT', types, JSON.stringify({ title }), docNormalize, true);
}

export function bulkCreateDocs(url, docs) {
    const types = [DOCS_BULK_CREATE, DOCS_BULK_CREATE_SUCCESS, LOAD_DOC_ERROR];
    return apiLoad(url, 'POST', types, JSON.stringify({ docs }), () => {}, true);
}

export function docsUnMount() {
    return {
        type: DOCS_UNMOUNT,
    };
}

export function checkFile(id) {
    return {
        type: CHECK_FILE,
        id,
    };
}
