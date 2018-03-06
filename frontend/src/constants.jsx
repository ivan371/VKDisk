export const urls = {
    folder: {
        foldersUrl: '/api/v1/folders/?root&&',
        chatFolderUrl: '/api/v1/folders/?chats&&',
        customFolderUrl: '/api/v1/folders/',
        sortFolderUrl: '/api/v1/folders/?sorted&&',
    },
    docs: {
        docsUrl: '/api/v1/documents/',
    },
};

export const makeUrls = {
    makeFilterDocsFolder: id => `${urls.docs.docsUrl}?folder=${id}`,
    makeFilterFoldersFolder: id => `${urls.folder.customFolderUrl}?folder=${id}`,
    makeCustomFolder: id => `${urls.folder.customFolderUrl + id}/`,
    makeCustomFile: id => `${urls.docs.docsUrl + id}/`,
    makeDocsMore: (id, page) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}`,
    makeCopyDocs: id => `${urls.docs.docsUrl}?folder=${id}&&bulk_create`,
};

export const tileType = {
    file: 'file',
    folder: 'folder',
    folderAdd: 'folderAdd',
};

export const folderType = {
    root: 'root',
    chat: 'chat',
};

export const modalType = {
    folderCreate: 'folderCreate',
    folderTransfer: 'folderTransfer',
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
    jpg: '/static/img/formats/jpg.png',
    png: '/static/img/formats/png.png',
    txt: '/static/img/formats/txt.png',
    tex: '/static/img/formats/tex.png',
    py: '/static/img/formats/py.png',
    gif: '/static/img/formats/gif.png',
};

export const items = {
    add: '/static/img/add.png',
    back: '/static/img/back.png',
};

export function makeFormat(fileUrl) {
    let parts;
    let ext;
    parts, ext = `${(parts = fileUrl.split('/').pop().split('.')).length > 1 ? parts.pop() : ''}`;
    if (format[ext] !== undefined) { return format[ext]; }
    return format.file;
}
