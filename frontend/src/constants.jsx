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
    elastic: {
        customSearchUsl: '/api/v1/list?'
    },
    user: {
        currentUserUrl: '/api/v1/users/current/',
        userUrl: '/api/v1/users/'
    }
};

export const makeUrls = {
    makeUserUrl: id => `${urls.user.userUrl}${id}/`,
    makeFilterDocsFolder: id => `${urls.docs.docsUrl}?folder=${id}`,
    makeFilterFoldersFolder: id => `${urls.folder.customFolderUrl}?folder=${id}`,
    makeRootFoldersFolder: () => `${urls.folder.customFolderUrl}?root`,
    makeCustomFolder: id => `${urls.folder.customFolderUrl + id}/`,
    makeCustomFile: id => `${urls.docs.docsUrl + id}/`,
    makeTransferFile: id => `${urls.docs.docsUrl + id}/?replace`,
    makeDocsMore: (id, page, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsRootMore: (page, filter, value) => `${urls.docs.docsUrl}?root&&page=${page}&&filter&&${filter}=${value}`,
    makeDocsMoreDate: (id, page, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&page=${page}&filter&year=${year}&month=${month}&day=${day}`,
    makeCopyDocs: id => `${urls.docs.docsUrl}?folder=${id}&bulk_create`,
    makeReplaceDocs: id => `${urls.docs.docsUrl}?folder=${id}&bulk_update`,
    makeDeleteDocs: () => `${urls.docs.docsUrl}?bulk_delete`,
    makeFilterDocs: (id, filter, value) => `${urls.docs.docsUrl}?folder=${id}&&filter&&${value}=${filter}`,
    makeFilterSortDocs: (id, filter, value, sort, reverse) => `${urls.docs.docsUrl}?folder=${id}&filter&${value}=${filter}&sort=${sort}&${reverse ? 'reverse' : ''}`,
    makeFilterRootDocs: (filter, value) => `${urls.docs.docsUrl}?root&&filter&&${value}=${filter}`,
    makeFilterRootSortDocs: (filter, value, sort, reverse) => `${urls.docs.docsUrl}?root&&filter&${value}=${filter}&sort=${sort}&${reverse ? 'reverse' : ''}`,
    makeFilterDocsDate: (id, year, month, day) => `${urls.docs.docsUrl}?folder=${id}&filter&year=${year}&month=${month}&&day=${day}`,
    makeChatsMore: page => `${urls.folder.chatFolderUrl}&&page=${page}`,
    makeFilterSortChats: (name, sort, reverse) => `${urls.folder.chatFolderUrl}filter&name=${name}&sort=${sort}&${reverse ? 'reverse' : ''}`,
    makeFilterChatsSortMore: (page, name, sort, reverse) => `${urls.folder.chatFolderUrl}filter&name=${name}&page=${page}&sort=${sort}&${reverse ? 'reverse' : ''}`,
    makeTransferFolder: id => `${urls.folder.customFolderUrl + id}/?replace`,
    makeFolderRecursive: id => `${urls.folder.customFolderUrl + id}/?recursive`,
    makeDocsMoreSort: (id, sort, filter, reverse, page, value) => `${urls.docs.docsUrl}?folder=${id}&page=${page}&filter&&${filter}=${value}&sort=${sort}&${reverse ? 'reverse' : ''}`,
    makeDocsMoreSortRoot: (sort, filter, reverse, page, value) => `${urls.docs.docsUrl}?root&page=${page}&filter&&${filter}=${value}&sort=${sort}&${reverse ? 'reverse' : ''}`,
};

export const makeElasticUrls = {
    makeFilterSortDocs: (id, sort, filter, reverse) => `${urls.elastic.customSearchUsl}search=${filter}&ordering=${reverse ? '-' : ''}${sort}&folder_id=${id}`,
    makeFilterSortDocsRoot: (sort, filter, reverse) => `${urls.elastic.customSearchUsl}search=${filter}&ordering=${reverse ? '-' : ''}${sort}&folder_type=chat`,
    makeDocsMore: (id, sort, filter, reverse, page) => `${urls.elastic.customSearchUsl}search=${filter}&ordering=${reverse ? '-' : ''}${sort}&folder_id=${id}&page=${page}`,
    makeDocsMoreRoot: (sort, filter, reverse, page) => `${urls.elastic.customSearchUsl}search=${filter}&ordering=${reverse ? '-' : ''}${sort}&folder_type=chat&page=${page}`
};


export const makeElastic = {
    makeFolderElastic: (id, filter, value, sort, reverse, isElastic) => {
        if (isElastic) {
            return makeElasticUrls.makeFilterSortDocs(id, sort, filter, reverse);
        } else {
            return makeUrls.makeFilterSortDocs(id, filter, value, sort, reverse);
        }
    },
    makeRootElastic: (filter, value, sort, reverse, isElastic) => {
        if (isElastic) {
            return makeElasticUrls.makeFilterSortDocsRoot(sort, filter, reverse);
        } else {
            return makeUrls.makeFilterRootSortDocs(filter, value, sort, reverse);
        }
    },
    makeFolderElasticMore: (id, filter, value, sort, reverse, isElastic, page) => {
        if (isElastic) {
            return makeElasticUrls.makeDocsMore(id, sort, filter, reverse, page);
        } else {
            return makeUrls.makeDocsMoreSort(id, sort, filter, reverse, page, value);
        }
    },
    makeRootElasticMore: (filter, value, sort, reverse, isElastic, page) => {
        if (isElastic) {
            return makeElasticUrls.makeDocsMoreRoot(sort, filter, reverse, page);
        } else {
            return makeUrls.makeDocsMoreSortRoot(sort, filter, reverse, page, value);
        }
    },
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
    rtf: '/static/img/formats/docx.png',
    pdf: '/static/img/formats/pdf.png',
    PDF: '/static/img/formats/pdf.png',
    pptx: '/static/img/formats/pptx.png',
    ppt: '/static/img/formats/pptx.png',
    PPT: '/static/img/formats/pptx.png',
    xls: '/static/img/formats/xls.png',
    xlsx: '/static/img/formats/xls.png',
    jpg: '/static/img/formats/jpg.png',
    JPG: '/static/img/formats/jpg.png',
    png: '/static/img/formats/png.png',
    txt: '/static/img/formats/txt.png',
    tex: '/static/img/formats/tex.png',
    py: '/static/img/formats/py.png',
    gif: '/static/img/formats/gif.png',
    GIF: '/static/img/formats/gif.png',
    zip: '/static/img/formats/zip.png',
    djvu: '/static/img/formats/djvu.png',
    rar: '/static/img/formats/rar.png',
    sql: '/static/img/formats/sql.png',
    c: '/static/img/formats/c.png',
};

export const items = {
    add: '/static/img/add.png',
    back: '/static/img/back.png',
    sort: '/static/img/sort.png',
    sortDirect: '/static/img/sort-direct.png',
    sortReverse: '/static/img/sort-reverse.png',
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
    on: '/static/img/on.png',
    off: '/static/img/off.png',
    settings: '/static/img/settings.png'
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
        id: 8,
        name: 'clear',
        value: '',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 1,
        name: 'pdf',
        value: '.pdf',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 2,
        name: 'doc',
        value: '.doc',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 3,
        name: 'jpg',
        value: '.jpg',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 4,
        name: 'png',
        value: '.png',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 5,
        name: 'tex',
        value: '.tex',
        type: 'filter',
        filterName: 'name',
    },
    {
        id: 7,
        name: 'ppt',
        value: '.ppt',
        type: 'filter',
        filterName: 'name',
    },
];

export const tagType = {
    filter: 'filter',
};

export const sort = {
    name: 'title',
    date: 'created',
};
