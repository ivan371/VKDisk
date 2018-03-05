import { apiLoad } from './load';
import { docsNormalize } from '../normalizers/document';

export const LOAD_DOCS = 'LOAD_DOCS';
export const LOAD_DOCS_SUCCESS = 'LOAD_DOCS_SUCCESS';
export const LOAD_DOCS_ERROR = 'LOAD_DOCS_ERROR';
export const DOCS_UNMOUNT = 'DOCS_UNMOUNT';

export function loadDocs(url) {
    const types = [LOAD_DOCS, LOAD_DOCS_SUCCESS, LOAD_DOCS_ERROR];
    return apiLoad(url, 'GET', types, null, docsNormalize, false);
}

export function docsUnMount() {
    return {
        type: DOCS_UNMOUNT,
    };
}
