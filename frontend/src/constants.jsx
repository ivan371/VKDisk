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
    makeTransferFile: id => `${urls.docs.docsUrl + id}/?replace`,
    makeDocsMore: (id, page, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsRootMore: (page, filter, value) => `${urls.docs.docsUrl}?root&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsMoreDate: (id, page, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}&&filter&&year=${year}&&month=${month}&&day=${day}`,
    makeCopyDocs: id => `${urls.docs.docsUrl}?folder=${id}&&bulk_create`,
    makeReplaceDocs: id => `${urls.docs.docsUrl}?folder=${id}&&bulk_update`,
    makeDeleteDocs: () => `${urls.docs.docsUrl}?bulk_delete`,
    makeFilterDocs: (id, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&filter&&${value}=${filter}`,
    makeFilterRootDocs: (filter, value) => `${urls.docs.docsUrl}?root&&filter&&${value}=${filter}`,
    makeFilterDocsDate: (id, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&&filter&&year=${year}&&month=${month}&&day=${day}`,
    makeChatsMore: page => `${urls.folder.chatFolderUrl}&&page=${page}`,
    makeFilterChats: name => `${urls.folder.chatFolderUrl}filter&&name=${name}`,
    makeFilterChatsMore: (name, page) => `${urls.folder.chatFolderUrl}filter&&name=${name}&&page=${page}`,
    makeTransferFolder: id => `${urls.folder.customFolderUrl + id}/?replace`,
    makeFolderRecursive: id => `${urls.folder.customFolderUrl + id}/?recursive`,
};

export const apps = {
    modal: 'modal',
    folder: 'folder',
    docs: 'docs',
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
    modal: 'modal',
};

export const modalType = {
    folderCreate: 'folderCreate',
    folderRootCreate: 'folderRootCreate',
    folderTransfer: 'folderTransfer',
    folderReplace: 'folderReplace',
    documentDelete: 'documentDelete',
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
    trash: '/static/img/trash.png',
    trashGood: '/static/img/trashGood.png',
    trashBad: '/static/img/trashBad.png',
    clear: '/static/img/clear.png',
    colRow: '/static/img/row-col.png',
    colTable: '/static/img/row-table.png',
    calendar: '/static/img/calendar.png',
    arrow: '/static/img/arrow.png',
    arrowRight: '/static/img/arrowRight.png',
};

export function makeFormat(fileUrl) {
    let parts;
    let ext;
    parts, ext = `${(parts = fileUrl.split('/').pop().split('.')).length > 1 ? parts.pop() : ''}`;
    if (format[ext] !== undefined) { return format[ext]; }
    return format.file;
}

export const dragSource = {
    file: 'file',
    favorite: 'favorite',
    folder: 'folder',
};

export const view = {
    col: 'col',
    row: 'row',
};

export const tags = [
    {
        id: 1,
        name: 'pdf',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 2,
        name: 'doc',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 3,
        name: 'jpg',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 4,
        name: 'png',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 5,
        name: 'tex',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 6,
        name: 'py',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 7,
        name: 'ppt',
        type: 'filter',
        filterName: 'name',
    },
];

export const tagType = {
    filter: 'filter',
};
