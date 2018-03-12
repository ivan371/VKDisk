export const urls = {
    folder: {
        foldersUrl: '/api/v1/folders/?type=root&&',
        chatFolderUrl: '/api/v1/folders/?type=chat&&',
        customFolderUrl: '/api/v1/folders/',
        sortFolderUrl: '/api/v1/folders/?sorted&&',
        folderFolderUrl: '/api/v1/folders/?type=folder&&',
    },
    docs: {
        docsUrl: '/api/v1/documents/',
        unsortedDocsUrl: '/api/v1/documents/?root',
    },
};

export const makeUrls = {
    makeFilterDocsFolder: id => `${urls.docs.docsUrl}?folder=${id}`,
    makeFilterFoldersFolder: id => `${urls.folder.customFolderUrl}?folder=${id}`,
    makeRootFoldersFolder: () => `${urls.folder.customFolderUrl}?root`,
    makeCustomFolder: id => `${urls.folder.customFolderUrl + id}/`,
    makeCustomFile: id => `${urls.docs.docsUrl + id}/`,
    makeDocsMore: (id, page, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsRootMore: (page, filter, value) => `${urls.docs.docsUrl}?root&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsMoreDate: (id, page, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}&&filter&&year=${year}&&month=${month}&&day=${day}`,
    makeCopyDocs: id => `${urls.docs.docsUrl}?folder=${id}&&bulk_create`,
    makeReplaceDocs: id => `${urls.docs.docsUrl}?folder=${id}&&bulk_update`,
    makeFilterDocs: (id, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&filter&&${filter}=${value}`,
    makeFilterRootDocs: (filter, value) => `${urls.docs.docsUrl}?root&&filter&&${filter}=${value}`,
    makeFilterDocsDate: (id, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&&filter&&year=${year}&&month=${month}&&day=${day}`,
    makeChatsMore: page => `${urls.folder.chatFolderUrl}&&page=${page}`,
};

export const apps = {
    modal: 'modal',
};

export const tileType = {
    file: 'file',
    folder: 'folder',
    folderAdd: 'folderAdd',
    folderModal: 'folderModal',
};

export const folderType = {
    root: 'root',
    chat: 'chat',
    folder: 'folder',
};

export const modalType = {
    folderCreate: 'folderCreate',
    folderRootCreate: 'folderRootCreate',
    folderTransfer: 'folderTransfer',
    folderReplace: 'folderReplace',
};

export const format = {
    folder: '/static/img/folder.png',
    folderAdd: '/static/img/folder_add.png',
    folderBack: '/static/img/folder_back.png',
    file: '/static/img/file.png',
    doc: '/static/img/formats/docx.png',
    docx: '/static/img/formats/docx.png',
    pdf: '/static/img/formats/pdf.png',
    pptx: '/static/img/formats/pptx.png',
    ppt: '/static/img/formats/pptx.png',
    xls: '/static/img/formats/xls.png',
    xlsx: '/static/img/formats/xls.png',
    jpg: '/static/img/formats/jpg.png',
    png: '/static/img/formats/png.png',
    txt: '/static/img/formats/txt.png',
    tex: '/static/img/formats/tex.png',
    py: '/static/img/formats/py.png',
    gif: '/static/img/formats/gif.png',
    zip: '/static/img/formats/zip.png',
    djvu: '/static/img/formats/djvu.png',
};

export const items = {
    add: '/static/img/add.png',
    back: '/static/img/back.png',
    sort: '/static/img/sort.png',
    filter: '/static/img/search.png',
};

export function makeFormat(fileUrl) {
    let parts;
    let ext;
    parts, ext = `${(parts = fileUrl.split('/').pop().split('.')).length > 1 ? parts.pop() : ''}`;
    if (format[ext] !== undefined) { return format[ext]; }
    return format.file;
}
